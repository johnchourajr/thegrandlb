// ID Index: tg-event-type, tg-event-name, tg-date, tg-time, tg-rooms, tg-guest-count


const inquiryForms = [
  {
    header: "The Basics",
    forms: [
      {
        label: "What type of event",
        id: "tg-event-type",
        type: "select",
        options: [
          "1",
          "2",
        ],
        placeholder: "",
        selected: "",
        required: true,
        className: "col xs-col-12",
      },{
        label: "Name your event",
        id: "tg-event-name",
        type: "text",
        validate: "",
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-12",
      },
    ]
  },{
    header: "The Finer Details",
    forms: [
      {
        label: "Desired Event Date",
        id: "tg-date",
        type: "date",
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },{
        label: "Desired Event Time",
        id: "tg-time",
        type: "time",
        validate: "",
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },{
        label: "Desired Room(s)",
        id: "tg-rooms",
        type: "select",
        multiple: true,
        options: [
          "1",
          "2",
        ],
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },{
        label: "Guest Count",
        id: "tg-guest-count",
        type: "text",
        validate: "",
        placeholder: "",
        value: "",
        required: false,
        className: "col xs-col-6",
      },
    ]
  },{
    header: "Talk About You",
    forms: [
      {
        label: "Your Name",
        id: "tg-contact-name",
        type: "text",
        validate: "",
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },{
        label: "Preferred contact method",
        id: "tg-contact-method",
        type: "select",
        options: [
          "1",
          "2",
        ],
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },{
        label: "Email",
        id: "tg-contact-email",
        type: "text",
        validate: "",
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },{
        label: "Phone Number",
        id: "tg-contact-phone",
        type: "text",
        validate: "",
        placeholder: "",
        value: "",
        required: true,
        className: "col xs-col-6",
      },
    ]
  },
]

export default inquiryForms
