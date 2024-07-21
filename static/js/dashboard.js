document.addEventListener('DOMContentLoaded', function() {
    fetch('/formdata/')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('formDataTableBody');
            data.forEach(form => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${form.id}</td>
                    <td>${form.form_id}</td>
                    <td>${form.fullname}</td>
                    <td>${form.phone1}</td>
                    <td>${form.phone2}</td>
                    <td>${form.language}</td>
                    <td>${form.language2}</td>
                    <td>${form.mail}</td>
                    <td>${form.date}</td>
                    <td>${form.gradst}</td>
                    <td>${form.address1}</td>
                    <td>${form.address2}</td>
                    <td>${form.language2}</td>
                    <td>${form.transport}</td>
                    <td>${form.civilst}</td>
                    <td>${form.religion}</td>
                    <td>${form.emergency}</td>
                    <td>${form.citizenship}</td>
                    <td>${form.gender}</td>
                    <td>${form.military}</td>
                    <td>${form.ccenter}</td>
                    <td>${form.worklocation}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching form data:', error));
});
