import assert from "node:assert/strict";
import test from "node:test";
import { getFormData } from "../data/form.types";
import { isValidEmail, validateValueWithRule } from "./inquire-validation";

test("isValidEmail accepts valid email formats", () => {
  const validEmails = [
    "camposgris@icloud.com",
    "user.name+tag@example.co",
    "person@sub.domain.org",
    "  trimmed@example.com  ",
  ];

  validEmails.forEach((email) => {
    assert.equal(isValidEmail(email), true, `${email} should be valid`);
  });
});

test("isValidEmail rejects invalid email formats", () => {
  const invalidEmails = [
    "",
    "camposgris@icloud,com",
    "camposgris@icloud",
    "campos gris@icloud.com",
    "missing-at-sign.example.com",
  ];

  invalidEmails.forEach((email) => {
    assert.equal(isValidEmail(email), false, `${email} should be invalid`);
  });
});

test("validateValueWithRule handles regex validation", () => {
  const regexRule = {
    rule: "regex",
    value: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
  };

  assert.equal(validateValueWithRule("camposgris@icloud.com", regexRule), true);
  assert.equal(validateValueWithRule("camposgris@icloud,com", regexRule), false);
});

test("validateValueWithRule rejects unknown regex patterns", () => {
  const unsupportedRegexRule = {
    rule: "regex",
    value: "^(a+)+$",
  };

  assert.equal(validateValueWithRule("aaaaaa", unsupportedRegexRule), false);
});

test("validateValueWithRule handles long input for allowlisted regex", () => {
  const minLengthRule = {
    rule: "regex",
    value: "^[\\s\\S]{3,}$",
  };
  const longInput = "A".repeat(10000);

  assert.equal(validateValueWithRule(longInput, minLengthRule), true);
});

test("validateValueWithRule handles min_value validation", () => {
  const minValueRule = { rule: "min_value", value: 2 };

  assert.equal(validateValueWithRule(2, minValueRule), true);
  assert.equal(validateValueWithRule("5", minValueRule), true);
  assert.equal(validateValueWithRule(1, minValueRule), false);
  assert.equal(validateValueWithRule("not-a-number", minValueRule), false);
});

test("validateValueWithRule handles max_length validation", () => {
  const maxLengthRule = { rule: "max_length", value: 5 };

  assert.equal(validateValueWithRule("short", maxLengthRule), true);
  assert.equal(validateValueWithRule("too-long", maxLengthRule), false);
});

test("validateValueWithRule supports optional/unknown rules safely", () => {
  assert.equal(validateValueWithRule("any value", null), true);
  assert.equal(validateValueWithRule("any value", undefined), true);
  assert.equal(
    validateValueWithRule("any value", { rule: "unknown_rule", value: true }),
    true
  );
});

test("form.json email validation rejects comma domains", () => {
  const formPages = getFormData();
  const emailQuestion = formPages
    .flatMap((page) => page.questions)
    .find((question) => question.question_key === "email");

  assert.ok(emailQuestion, "Email question should exist in form schema");
  assert.ok(emailQuestion.validations, "Email question should have validations");

  assert.equal(
    validateValueWithRule("camposgris@icloud,com", emailQuestion.validations),
    false
  );
  assert.equal(
    validateValueWithRule("camposgris@icloud.com", emailQuestion.validations),
    true
  );
});

test("form schema validation rules stay within supported set", () => {
  const supportedRules = new Set(["regex", "min_value", "max_length"]);
  const formPages = getFormData();

  formPages.forEach((page) => {
    page.questions.forEach((question) => {
      const rule = question.validations?.rule;
      assert.ok(
        supportedRules.has(rule),
        `Unsupported rule "${rule}" on question "${question.question_key}"`
      );
    });
  });
});

test("form schema regex patterns stay within supported allowlist", () => {
  const supportedRegexValues = new Set([
    "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
    "^\\d{3}-\\d{3}-\\d{4}$",
    "^.{1,}$",
    "^.{2,}$",
    "^[\\s\\S]{3,}$",
    "^.{0,500}$",
  ]);

  const formPages = getFormData();

  formPages.forEach((page) => {
    page.questions.forEach((question) => {
      const validations = question.validations;
      if (validations?.rule !== "regex") {
        return;
      }

      assert.equal(
        typeof validations.value,
        "string",
        `Regex validation should be a string on question "${question.question_key}"`
      );
      assert.ok(
        supportedRegexValues.has(String(validations.value)),
        `Unsupported regex value "${validations.value}" on question "${question.question_key}"`
      );
    });
  });
});
