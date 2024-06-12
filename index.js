// Function to fetch parties from the server
function fetchParties() {
    fetch('/parties')
        .then(response => response.json())
        .then(parties => {
            parties.forEach(party => {
                addPartyToList(party);
            });
        })
        .catch(error => console.error('Error fetching parties:', error));
}

// Function to handle form submission
document.getElementById('partyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form values
    var name = document.getElementById('name').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;
    var location = document.getElementById('location').value;
    var description = document.getElementById('description').value;
    
    // Create party object
    var party = {
        name: name,
        date: date,
        time: time,
        location: location,
        description: description
    };
    
    // Call function to add party to list
    addPartyToList(party);

    // Reset form fields
    document.getElementById('partyForm').reset();

    // Send POST request to add party to the server
    fetch('/parties', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(party)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add party');
        }
    })
    .catch(error => console.error('Error adding party:', error));
});

// Function to add party to list
function addPartyToList(party) {
    // Create list item element
    var listItem = document.createElement('li');
    
    // Add party details to list item
    listItem.innerHTML = `<strong>${party.name}</strong><br>
                          Date: ${party.date}<br>
                          Time: ${party.time}<br>
                          Location: ${party.location}<br>
                          Description: ${party.description}<br>
                          <button onclick="deleteParty('${party._id}')">Delete</button>`;
    
    // Append list item to party list
    document.getElementById('partyList').appendChild(listItem);
}

// Function to delete party from list and server
function deleteParty(partyId) {
    // Send DELETE request to remove party from the server
    fetch(`/parties/${partyId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete party');
        }
        // Remove party from the list
        var listItem = document.querySelector(`li[data-id="${partyId}"]`);
        listItem.parentNode.removeChild(listItem);
    })
    .catch(error => console.error('Error deleting party:', error));
}

// Fetch parties when the page loads
window.onload = fetchParties;