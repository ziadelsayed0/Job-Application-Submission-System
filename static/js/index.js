console.log("JSON Options:", options);
config = options.options;

formname = document.getElementById("formname");
formname.textContent = options.name;

fullname = document.getElementById("full-name");
phone1 = document.getElementById("phone-no");
phone2 = document.getElementById("other-phone");
language = document.getElementById("language");
language2 = document.getElementById("second-language");
mail = document.getElementById("mail");
date = document.getElementById("date");
gradst = document.getElementById("graduate-status");
university = document.getElementById("university");
major = document.getElementById("major");
address1 = document.getElementById("national-address");
address2 = document.getElementById("residency-address");
transport = document.getElementById("daily-transport");
civilst = document.getElementById("civil-status");
religion = document.getElementById("religion");
emergency = document.getElementById("emergency");
Citizenship = document.getElementById("Citizenship");
gender = document.getElementById("gender");
military = document.getElementById("military");
availability = document.getElementById("availability");
ccenter = document.getElementById("contact-center");
worklocation = document.getElementById("work-location");

fullname.className += (config.fullname === true) ? "" : " d-none";
phone1.className += (config.phone === true) ? "" : " d-none";
phone2.className += (config.otherphone === true) ? "" : " d-none";
language.className += (config.language === true) ? "" : " d-none";
language2.className += (config.seclanguage === true) ? "" : " d-none";
mail.className += (config.mail === true) ? "" : " d-none";
date.className += (config.date === true) ? "" : " d-none";
gradst.className += (config.gradestatus === true) ? "" : " d-none";
university.className += (config.university === true) ? "" : " d-none";
major.className += (config.major === true) ? "" : " d-none";
Citizenship.className += (config.citizenship === true) ? "" : " d-none";
address2.className += (config.residencyaddress === true) ? "" : " d-none";
address1.className += (config.nationaladdress === true) ? "" : " d-none";
transport.className += (config.transport === true) ? "" : " d-none";
civilst.className += (config.civilstatus === true) ? "" : " d-none";
religion.className += (config.religion === true) ? "" : " d-none";
emergency.className += (config.emergency === true) ? "" : " d-none";
gender.className += (config.gender === true) ? "" : " d-none";
availability.className += (config.availability === true) ? "" : " d-none";
military.className += (config.military === true) ? "" : " d-none";
worklocation.className += (config.worklocation === true) ? "" : " d-none";
ccenter.className += (config.contactcenter === true) ? "" : " d-none";


// Function to extract form ID from URL
function getFormIdFromUrl() {
    const url = window.location.href;
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 1];
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("your-form-id");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = {
            fullname: document.getElementById("fullName").value,
            phone1: document.getElementById("primaryPhoneNumber").value,
            phone2: document.getElementById("otherPhoneNumber").value,
            language: document.getElementById("languageSelect").value,
            language2: document.getElementById("SecondLanguageSelect").value,
            mail: document.getElementById("MailAddress").value,
            date: document.getElementById("birthDate").value,
            gradst: document.getElementById("graduationStatus").value,
            university: document.getElementById("universities").value,
            major: document.getElementById("Major").value,
            address1: document.getElementById("Address_in_National_ID").value,
            address2: document.getElementById("Residency_Address").value,
            transport: document.getElementById("Daily_Transportation_District").value,
            civilst: document.getElementById("Civil_Status").value,
            religion: document.getElementById("Religion").value,
            emergency: document.getElementById("Emergency_Contact_Number").value,
            citizenship: document.getElementById("Nationality").value,
            gender: document.getElementById("Gender").value,
            military: document.getElementById("Military_Status").value,
            availability: document.getElementById("Availability_to_Start").value,
            ccenter: document.getElementById("Contact_Center_Experience_Existence").value,
            worklocation: document.getElementById("Preferred_Work_Location").value
        };
        console.log(getFormIdFromUrl());
        console.log(JSON.stringify(formData));

        fetch(`/form/${getFormIdFromUrl()}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Form submitted successfully');
                clearForm();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error submitting form');
            });
    });
});

//to clean form after submittion
function clearForm() {
    document.getElementById("fullName").value = '';
    document.getElementById("primaryPhoneNumber").value = '';
    document.getElementById("otherPhoneNumber").value = '';
    document.getElementById("languageSelect").value = '';
    document.getElementById("SecondLanguageSelect").value = '';
    document.getElementById("MailAddress").value = '';
    document.getElementById("birthDate").value = '';
    document.getElementById("graduationStatus").value = '';
    document.getElementById("universities").value = '';
    document.getElementById("Major").value = '';
    document.getElementById("Address_in_National_ID").value = '';
    document.getElementById("Residency_Address").value = '';
    document.getElementById("Daily_Transportation_District").value = '';
    document.getElementById("Civil_Status").value = '';
    document.getElementById("Religion").value = '';
    document.getElementById("Emergency_Contact_Number").value = '';
    document.getElementById("Nationality").value = '';
    document.getElementById("Gender").value = '';
    document.getElementById("Military_Status").value = '';
    document.getElementById("Availability_to_Start").value = '';
    document.getElementById("Contact_Center_Experience_Existence").value = '';
    document.getElementById("Preferred_Work_Location").value = '';
}