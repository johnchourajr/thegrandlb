/* eslint-disable */

// ID Index: glb-event-type, glb-event-name, glb-date, glb-time, glb-rooms, glb-guest-count

const now = new Date();

const inquiryForms = [
  {
    header: "The Basics",
    isValid: false,
    forms: [
      {
        label: "What type of event",
        id: "glb-event-type",
        type: "select",
        options: [
          "Wedding Ceremony & Reception",
          "Wedding Reception",
          "Wedding Ceremony",
          "Business",
          "Conference/Workshop",
          "Luncheon",
          "Dinner",
          "School Event",
          "Anniversary",
          "Sweet 16/Quince",
          "Birthday Party",
          "Holiday Party",
          "Party",
          "Fundraiser",
          "Memorial",
          "Other"
        ],
        placeholder: "Wedding ",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Make a selection",
        className: "col xs-col-12"
      },
      {
        label: "Name your event",
        id: "glb-event-name",
        type: "text",
        validate: /^.{2,}$/,
        placeholder: "The Wagner Wedding",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Name your event",
        className: "col xs-col-12"
      }
    ]
  },
  {
    header: "The Finer Details",
    isValid: false,
    forms: [
      {
        label: "Desired Event Date",
        id: "glb-date",
        type: "date",
        placeholder: "",
        value: "",
        min: now.toISOString().substr(0, 10),
        required: true,
        isValid: false,
        hasError: false,
        error: "Select a date",
        className: "col xs-col-12 sm-col-6"
      },
      {
        label: "Desired Event Time",
        id: "glb-time",
        type: "select",
        options: [
          "8am",
          "9am",
          "10am",
          "11am",
          "12pm",
          "1pm",
          "2pm",
          "3pm",
          "4pm",
          "5pm",
          "6pm",
          "7pm",
          "8pm",
          "9pm",
          "10pm"
        ],
        placeholder: "8am",
        value: "",
        step: "900",
        required: true,
        isValid: false,
        hasError: false,
        error: "Select a time",
        className: "col xs-col-12 sm-col-6"
      },
      {
        label: "Desired Room",
        id: "glb-rooms",
        type: "select",
        options: [
          "The Grand Ballroom",
          "The Catalina Room",
          "The Monarch Room",
          "The Garden Room",
          "The Pacific Room",
          "The Board Room",
          "The Palm Terrace"
        ],
        placeholder: "The Grand Ballroom ",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Make a selection",
        className: "col xs-col-12 sm-col-6"
      },
      {
        label: "Guest Count",
        id: "glb-guest-count",
        type: "number",
        placeholder: "100",
        validate: /^.{1,}$/,
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Enter number greater than 1",
        className: "col xs-col-12 sm-col-6"
      }
    ]
  },
  {
    header: "Talk About You",
    isValid: false,
    forms: [
      {
        label: "Your Name",
        id: "glb-contact-name",
        type: "text",
        validate: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        placeholder: "Elle Wagner",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Name isn't valid",
        className: "col xs-col-12 sm-col-6"
      },
      {
        label: "Preferred contact method",
        id: "glb-contact-method",
        type: "select",
        options: ["Phone and Email", "Phone", "Email"],
        placeholder: "Phone and Email ",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Please make a selection",
        className: "col xs-col-12 sm-col-6"
      },
      {
        label: "Email",
        id: "glb-contact-email",
        type: "email",
        validate: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
        placeholder: "elle@website.com",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Email isn't valid",
        className: "col xs-col-12 sm-col-6"
      },
      {
        label: "Phone Number",
        id: "glb-contact-phone",
        type: "text",
        // validate: "^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$",
        validate: /^([0-9]( |-|.)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-|.)?([0-9]{3}( |-|.)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
        placeholder: "5624260555",
        value: "",
        required: true,
        isValid: false,
        hasError: false,
        error: "Phone number isn't valid",
        className: "col xs-col-12 sm-col-6"
      }
    ]
  }
];

export default inquiryForms;
