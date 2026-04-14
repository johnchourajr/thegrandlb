type FieldValue = {
  value?: string | number;
};

type EmailBodyProps = {
  event_name?: FieldValue;
  event_type?: FieldValue;
  desired_date?: FieldValue;
  desired_time?: FieldValue;
  head_count?: FieldValue;
  desired_space?: FieldValue;
  full_name?: FieldValue;
  email?: FieldValue;
  phone?: FieldValue;
  additional_details?: FieldValue;
};

const cardStyle = {
  backgroundColor: "#fafafa",
  borderRadius: "6px",
  padding: "14px 16px",
};

const rowStyle = {
  color: "#333333",
  fontSize: "14px",
  lineHeight: "1.6",
  margin: "0 0 8px",
};

const labelStyle = {
  color: "#9e8d7a",
};

function formatDate(date: string) {
  if (!date) return "";
  const dateObj = new Date(date);
  dateObj.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC

  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const EmailBody = ({
  event_name = { value: "" },
  event_type = { value: "" },
  desired_date = { value: "" },
  desired_time = { value: "" },
  head_count = { value: "" },
  desired_space = { value: "" },
  full_name = { value: "" },
  email = { value: "" },
  phone = { value: "" },
  additional_details = { value: "" },
}: EmailBodyProps) => (
  <div style={cardStyle}>
    <p style={rowStyle}>
      <span style={labelStyle}>Event Name:</span>{" "}
      {event_name.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Event Type:</span>{" "}
      {event_type.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Desired Date:</span>{" "}
      {formatDate(String(desired_date.value ?? "")) || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Desired Time:</span>{" "}
      {desired_time.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Guest Count:</span>{" "}
      {head_count.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Desired Space:</span>{" "}
      {desired_space.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Full Name:</span>{" "}
      {full_name.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Email:</span> {email.value || "N/A"}
    </p>
    <p style={rowStyle}>
      <span style={labelStyle}>Phone:</span> {phone.value || "N/A"}
    </p>
    <p style={{ ...rowStyle, margin: 0 }}>
      <span style={labelStyle}>Additional Details:</span>{" "}
      {additional_details.value || "N/A"}
    </p>
  </div>
);

export default EmailBody;
