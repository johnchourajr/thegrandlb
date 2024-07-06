interface EmailBodyProps {
  event_name?: any;
  event_type?: any;
  desired_date?: any;
  desired_time?: any;
  head_count?: any;
  desired_space?: any;
  full_name?: any;
  email?: any;
  phone?: any;
  additional_details?: any;
}

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
  <div className="rounded bg-[white] px-[16px] py-[1px]">
    <p>
      <span className="opacity-[0.5]">Event Name:</span>{" "}
      {event_name.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Event Type:</span>{" "}
      {event_type.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Desired Date:</span>{" "}
      {formatDate(desired_date.value) || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Desired Time:</span>{" "}
      {desired_time.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Guest Count:</span>{" "}
      {head_count.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Desired Space:</span>{" "}
      {desired_space.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Full Name:</span>{" "}
      {full_name.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Email:</span> {email.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Phone:</span> {phone.value || "N/A"}
    </p>
    <p>
      <span className="opacity-[0.5]">Additional Details:</span>{" "}
      {additional_details.value || "N/A"}
    </p>
  </div>
);

export default EmailBody;
