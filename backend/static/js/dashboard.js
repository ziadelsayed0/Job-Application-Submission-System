document.addEventListener('DOMContentLoaded', function () {
    // Fetch forms data
    fetch('/forms/')
        .then(response => response.json())
        .then(formsData => {
            // Fetch form data
            fetch('/formdata/')
                .then(response => response.json())
                .then(formData => {
                    const cardsContainer = document.getElementById('formCardsContainer');

                    // Create a map of form_id to its formdata entries
                    const formDataMap = new Map();
                    formData.forEach(data => {
                        if (!formDataMap.has(data.form_id)) {
                            formDataMap.set(data.form_id, []);
                        }
                        formDataMap.get(data.form_id).push(data);
                    });

                    // Create cards for each form and include its formdata entries
                    formsData.forEach(form => {
                        const card = document.createElement('div');
                        card.className = 'card mb-3';

                        const cardHeader = document.createElement('div');
                        cardHeader.className = 'card-header d-flex justify-content-between align-items-center';

                        // Form URL button
                        const formUrl = document.createElement('button');
                        formUrl.className = 'btn btn-sm bg-success text-white';
                        // Add Material Icon and text to the button
                        formUrl.innerHTML = '<span class="material-icons" style="font-size: 80%;vertical-align: middle;">arrow_forward</span> GO';
                        formUrl.onclick = function () {
                            window.location.href = `/forms/${form.id}`;  // Navigate to the form's URL
                        };
                        cardHeader.appendChild(formUrl);

                        // Form name
                        const formName = document.createElement('span');
                        formName.textContent = form.name;
                        cardHeader.appendChild(formName);

                        // Delete button for the form
                        const deleteFormButton = document.createElement('button');
                        deleteFormButton.className = 'btn btn-danger btn-sm';
                        deleteFormButton.textContent = 'Delete Form';
                        deleteFormButton.addEventListener('click', function () {
                            if (confirm('Are you sure you want to delete this form and all its data?')) {
                                // Remove card from the UI
                                card.remove();

                                // Optionally, send a request to the server to delete the form
                                fetch(`/deleteform/${form.id}/`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                }).then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok.');
                                    }
                                }).catch(error => console.error('Error deleting form:', error));
                            }
                        });

                        cardHeader.appendChild(deleteFormButton);
                        card.appendChild(cardHeader);

                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';
                        cardBody.style.display = 'none'; // Hide by default

                        const ul = document.createElement('ul');
                        ul.className = 'list-group list-group-flush';
                        const formEntries = formDataMap.get(form.id) || [];
                        formEntries.forEach(data => {
                            const li = document.createElement('li');
                            li.className = 'list-group-item d-flex justify-content-between align-items-center';
                            li.textContent = data.fullname;
                            li.style.cursor = 'pointer';

                            // Create details div
                            const detailsDiv = document.createElement('div');
                            detailsDiv.className = 'details';

                            const detailsList = document.createElement('ul');
                            detailsList.className = 'details-list';
                            const detailsData = [
                                { label: 'ID', value: data.id },
                                { label: 'Full Name', value: data.fullname },
                                { label: 'Phone 1', value: data.phone1 },
                                { label: 'Phone 2', value: data.phone2 },
                                { label: 'Language', value: data.language },
                                { label: 'Language 2', value: data.language2 },
                                { label: 'Mail', value: data.mail },
                                { label: 'Date', value: data.date },
                                { label: 'Graduation Status', value: data.gradst },
                                { label: 'University', value: data.university },
                                { label: 'Major', value: data.major },
                                { label: 'Address 1', value: data.address1 },
                                { label: 'Address 2', value: data.address2 },
                                { label: 'Transport', value: data.transport },
                                { label: 'Civil Status', value: data.civilst },
                                { label: 'Religion', value: data.religion },
                                { label: 'Emergency', value: data.emergency },
                                { label: 'Citizenship', value: data.citizenship },
                                { label: 'Gender', value: data.gender },
                                { label: 'Military Status', value: data.military },
                                { label: 'Contact Center', value: data.ccenter },
                                { label: 'Work Location', value: data.worklocation },
                            ];

                            detailsData.forEach(detail => {
                                const detailItem = document.createElement('li');
                                detailItem.innerHTML = `<label>${detail.label}:</label> ${detail.value}`;
                                detailsList.appendChild(detailItem);
                            });

                            detailsDiv.appendChild(detailsList);
                            li.appendChild(detailsDiv);

                            // Create delete button for each entry
                            const deleteButton = document.createElement('i');
                            deleteButton.className = 'material-icons';
                            deleteButton.textContent = 'delete';
                            deleteButton.style = 'font-size:99%;color:red'
                            deleteButton.addEventListener('click', function () {
                                if (confirm('Are you sure you want to delete this entry?')) {
                                    // Remove entry from the UI
                                    li.remove();

                                    // Optionally, send a request to the server to delete the entry
                                    fetch(`/deleteforms/${data.form_id}/${data.id}/`, {
                                        method: 'DELETE',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }
                                    }).then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok.');
                                        }
                                    }).catch(error => console.error('Error deleting data:', error));
                                }
                            });

                            li.appendChild(deleteButton);

                            li.addEventListener('click', function () {
                                const isVisible = detailsDiv.style.display === 'block';
                                const allDetailsDivs = document.querySelectorAll('.details');
                                allDetailsDivs.forEach(div => div.style.display = 'none');
                                detailsDiv.style.display = isVisible ? 'none' : 'block';
                            });

                            ul.appendChild(li);
                        });

                        cardBody.appendChild(ul);
                        card.appendChild(cardBody);
                        cardsContainer.appendChild(card);

                        // Toggle the card body when the card header is clicked
                        cardHeader.addEventListener('click', function () {
                            cardBody.style.display = cardBody.style.display === 'none' || cardBody.style.display === '' ? 'block' : 'none';
                        });
                    });

                    // Implement search functionality
                    document.getElementById('searchInput').addEventListener('keyup', function () {
                        const searchValue = this.value.toLowerCase();
                        const cards = document.querySelectorAll('#formCardsContainer .card');
                        cards.forEach(card => {
                            const cardHeader = card.querySelector('.card-header').textContent.toLowerCase();
                            if (cardHeader.includes(searchValue)) {
                                card.style.display = '';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    });
                })
                .catch(error => console.error('Error fetching form data:', error));
        })
        .catch(error => console.error('Error fetching forms:', error));
});
