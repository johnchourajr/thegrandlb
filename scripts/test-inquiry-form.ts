#!/usr/bin/env tsx
/**
 * CI test for inquiry form submission flow
 * Tests that both add-to-database and send-client-email endpoints work correctly
 * Uses TEST_MODE to skip actual DB insert and email send
 */

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";
const TEST_EMAIL = "ci-test@thegrandlb.com";

const testFormData = {
  full_name: "CI Test User",
  email: TEST_EMAIL,
  phone: "555-555-5555",
  event_name: "CI Test Event",
  event_type: "Birthday Party",
  head_count: 50,
  desired_date: "2025-12-31",
  desired_time: "6pm",
  desired_space: "Grand Ballroom",
  additional_details: "This is an automated CI test submission",
};

async function waitForServer(url: string, maxRetries = 30, delayMs = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok || response.status === 404) {
        return true;
      }
    } catch (error) {
      // Server not ready yet
    }
    if (i < maxRetries - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw new Error(`Server at ${url} did not become available after ${maxRetries} attempts`);
}

async function testInquiryForm() {
  console.log(`Testing inquiry form endpoints at ${BASE_URL}`);
  console.log(`Using test email: ${TEST_EMAIL}`);
  console.log("TEST_MODE enabled - no actual DB insert or email send\n");

  // Wait for server to be ready
  console.log("Waiting for server to be ready...");
  try {
    await waitForServer(BASE_URL);
    console.log("✓ Server is ready\n");
  } catch (error) {
    console.error("✗ Server not available:", error);
    process.exit(1);
  }

  let addToDbSuccess = false;
  let sendEmailSuccess = false;
  let addToDbError: Error | null = null;
  let sendEmailError: Error | null = null;

  // Test add-to-database endpoint
  try {
    console.log("1. Testing /api/add-to-database...");
    const dbResponse = await fetch(`${BASE_URL}/api/add-to-database`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testFormData),
    });

    if (!dbResponse.ok) {
      const errorBody = await dbResponse.text();
      throw new Error(
        `add-to-database returned ${dbResponse.status}: ${errorBody}`
      );
    }

    const dbResult = await dbResponse.json();
    if (dbResult.message !== "Data inserted successfully" && !dbResult.testMode) {
      throw new Error(`Unexpected response: ${JSON.stringify(dbResult)}`);
    }

    console.log("   ✓ add-to-database endpoint passed");
    addToDbSuccess = true;
  } catch (error) {
    console.error("   ✗ add-to-database endpoint failed:", error);
    addToDbError = error instanceof Error ? error : new Error(String(error));
  }

  // Test send-client-email endpoint
  try {
    console.log("2. Testing /api/send-client-email...");
    const emailResponse = await fetch(`${BASE_URL}/api/send-client-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: TEST_EMAIL,
        formState: {
          event_name: { value: testFormData.event_name },
          event_type: { value: testFormData.event_type },
          desired_date: { value: testFormData.desired_date },
          desired_time: { value: testFormData.desired_time },
          desired_space: { value: testFormData.desired_space },
          full_name: { value: testFormData.full_name },
          email: { value: testFormData.email },
          phone: { value: testFormData.phone },
          head_count: { value: String(testFormData.head_count) },
          additional_details: { value: testFormData.additional_details },
        },
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();
      throw new Error(
        `send-client-email returned ${emailResponse.status}: ${errorBody}`
      );
    }

    const emailResult = await emailResponse.json();
    if (
      emailResult.message !== "Email sent successfully" &&
      !emailResult.testMode
    ) {
      throw new Error(`Unexpected response: ${JSON.stringify(emailResult)}`);
    }

    console.log("   ✓ send-client-email endpoint passed");
    sendEmailSuccess = true;
  } catch (error) {
    console.error("   ✗ send-client-email endpoint failed:", error);
    sendEmailError = error instanceof Error ? error : new Error(String(error));
  }

  // Summary
  console.log("\n--- Test Summary ---");
  if (addToDbSuccess && sendEmailSuccess) {
    console.log("✓ All tests passed!");
    process.exit(0);
  } else {
    console.error("✗ Some tests failed:");
    if (!addToDbSuccess && addToDbError) {
      console.error(`  - add-to-database: ${addToDbError.message}`);
    }
    if (!sendEmailSuccess && sendEmailError) {
      console.error(`  - send-client-email: ${sendEmailError.message}`);
    }

    // Trigger error notification if we can
    if (process.env.NEXT_RESEND_API_KEY && process.env.CI_ERROR_NOTIFICATION_EMAIL) {
      try {
        console.log("\nSending error notification...");
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.NEXT_RESEND_API_KEY);
        const resendAny = resend as unknown as {
          baseUrl: string;
          request: { defaults: { baseURL: string } };
        };
        resendAny.baseUrl = "https://api.resend.com";
        resendAny.request.defaults.baseURL = "https://api.resend.com";

        await resend.emails.send({
          from: process.env.NEXT_PUBLIC_RESEND_FROM_EMAIL || "hello@thegrandlb.com",
          to: process.env.CI_ERROR_NOTIFICATION_EMAIL,
          subject: "[CI] Inquiry form test failed",
          html: `
            <h2>CI Test Failure</h2>
            <p>The inquiry form CI test failed.</p>
            <h3>Failed Tests:</h3>
            <ul>
              ${!addToDbSuccess ? `<li>add-to-database: ${addToDbError?.message || "Unknown error"}</li>` : ""}
              ${!sendEmailSuccess ? `<li>send-client-email: ${sendEmailError?.message || "Unknown error"}</li>` : ""}
            </ul>
            <p><strong>Commit:</strong> ${process.env.GITHUB_SHA || "unknown"}</p>
            <p><strong>Workflow:</strong> ${process.env.GITHUB_WORKFLOW || "unknown"}</p>
          `,
        });
        console.log("   ✓ Error notification sent");
      } catch (notifError) {
        console.error("   ✗ Failed to send error notification:", notifError);
      }
    }

    process.exit(1);
  }
}

testInquiryForm().catch((error) => {
  console.error("Test script error:", error);
  process.exit(1);
});

export {};
