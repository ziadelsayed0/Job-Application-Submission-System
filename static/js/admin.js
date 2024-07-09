document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('adminForm');

    const fullname = document.getElementById("full-name");
    const phone1 = document.getElementById("phone1");
    const phone2 = document.getElementById("phone2");
    const language = document.getElementById("language");
    const language2 = document.getElementById("language2");
    const mail = document.getElementById("mail");
    const date = document.getElementById("date");
    const gradst = document.getElementById("gradst");
    const university = document.getElementById("university");
    const major = document.getElementById("major");
    const address1 = document.getElementById("address1");
    const address2 = document.getElementById("address2");
    const transport = document.getElementById("transport");
    const civilst = document.getElementById("civilst");
    const religion = document.getElementById("religion");
    const emergency = document.getElementById("emergency");
    const citizenship = document.getElementById("citizenship");
    const gender = document.getElementById("gender");
    const military = document.getElementById("military");
    const ccenter = document.getElementById("ccenter");
    const worklocation = document.getElementById("worklocation");

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const options = {
            fullname: fullname.checked,
            phone: phone1.checked,
            otherphone: phone2.checked,
            language: language.checked,
            seclanguage: language2.checked,
            mail: mail.checked,
            date: date.checked,
            gradestatus: gradst.checked,
            university: university.checked,
            major: major.checked,
            citizenship: citizenship.checked,
            residencyaddress: address2.checked,
            nationaladdress: address1.checked,
            transport: transport.checked,
            civilstatus: civilst.checked,
            religion: religion.checked,
            emergency: emergency.checked,
            gender: gender.checked,
            military: military.checked,
            worklocation: worklocation.checked,
            contactcenter: ccenter.checked
        };

        const data = {
            name: document.getElementById('formname').value,
            options: options
        };

        fetch('http://localhost:5000/forms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(response => {
            const responseId = response.id;
            window.location.href = `http://127.0.0.1:5000/forms/${responseId}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
