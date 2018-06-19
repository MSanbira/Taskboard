
// UI board

function createBoard(listsArr) {
    let listsHTML = '';
    for (const list of listsArr) {
        listsHTML += createList(list);
    }
    document.querySelector(".taskboard-board").innerHTML = listsHTML +
        '<button class="btn btn-info m-2 col-lg-2 text-left btn-add">Add a list...</button>';
}

function createList(list) {
    let cardsHTML = '';
    for (const card of list.cards) {
        cardsHTML += createCard(card);
    }
    const listHTML = `<section class="card m-2 p-0 taskboard-list">

        <div class="d-flex card-header justify-content-between align-items-center">
            <h5>${list.title}</h5>
            <div class="position-relative btn-scroll">
                <button class="btn btn-light bg-white border list-options-toggle-btn">&#9662</button>
                <button class="btn btn-light position-absolute bg-white border btn-dlt-list" data-list-id="${list.id}">Delete list</button>
            </div>
        </div>

        <div class="card-body p-3">
            ${cardsHTML}
        </div>

        <div class="card-footer">
            <p class="mb-0">Add a card...</p>
        </div>

    </section>`;
    return listHTML;
}

function createCard(card) {
    let cardHTML = '';
    if (card.members.length == 0) {
        cardHTML = `<div class="border border-info rounded p-3 mb-3 taskboard-card">
        <button class="btn-edit">Edit card</button>

        <p class="mb-4">${card.text}</p>

    </div>`;
    }
    else {
        const initialsHTML = createCardInitials(card.members);
        cardHTML = `<div class="border border-info rounded p-3 mb-3 taskboard-card">
        <button class="btn-edit">Edit card</button>

        <p class="mb-4">${card.text}</p>

        <div class="d-flex justify-content-end taskboard-card-members">
            ${initialsHTML}
        </div>

    </div>`;
    }
    return cardHTML;
}

function createCardInitials(cardMembers) {
    let initialsHTML = '';
    for (const id of cardMembers) {
        let cardMember = findMemberById(id);
        initialsHTML += `<span class="card-member" title="${cardMember}">${createInitials(cardMember)}</span>`;
    }
    return initialsHTML;
}

function createInitials(fullName) {
    let initials = "";
    let nameArr = fullName.split(" ");
    for (const name of nameArr) {
        initials += name.charAt(0);
    }
    return initials.toUpperCase();
}

function findMemberById(searchId) {
    for (const member of model.members) {
        if (searchId == member.id) {
            return member.fullName;
            break;
        }
    }
}

// UI members

function createMembersList(members) {
    let membersHTML = '';
    for (const member of members) {
        membersHTML += createMember(member);
    }
    document.querySelector(".members-list").innerHTML = membersHTML +
        `<li class="list-group-item d-flex align-content-center">
        <input class="form-control form-control-lg mr-2 input-member" type="text" placeholder="Add new member">
        <button class="btn btn-primary btn-add-member">Add</button>
    </li>`;
}

function createMember(member) {
    let memberHTML = `<li class="list-group-item">
        <div class="member">
            <span>${member.fullName.trim()}</span>
            <div class="btn-hover">
                <button class="btn btn-info btn-edit-member" data-member-id="${member.id}">Edit</button>
                <button class="btn btn-danger btn-dlt-member" data-member-id="${member.id}">Delete</button>
            </div>
        </div>
        <div class="member confirm-edit">
            <input class="form-control form-control-lg mr-2 edit-member" type="text">
            <div class="btn-confirm-edit">
                <button class="btn btn-light btn-cancel-member" data-member-id="${member.id}">Cancel</button>
                <button class="btn btn-success btn-save-member" data-member-id="${member.id}">Save</button>
            </div>
        </div>
    </li>`;
    return memberHTML;
}

// board functions

function toggleDeleteList(eventTarget) {
    eventTarget.parentElement.querySelector('.btn-dlt-list').classList.toggle('show');
}

function hideDeleteListBtn() {
    let btnDeleteList = document.querySelectorAll('.btn-dlt-list');
    for (const btn of btnDeleteList) {
        btn.classList.remove('show');
    }
}

function deleteList(eventTarget) {
    if (confirm('Are you sure?')) {
        model.deleteList(eventTarget.getAttribute('data-list-id'));
        createBoard(model.lists);
    }
}

// members functions

function addMember() {
    let inputValue = document.querySelector('.input-member').value;
    if (inputValue != "") {
        model.addMember(inputValue);
        inputValue = "";
        createMembersList(model.members);
    }
    else {
        alert('You must write the name first, try again.')
    }
}

function deleteMember(eventTarget) {
    if (confirm('Are you sure?')) {
        model.deleteMember(eventTarget.getAttribute('data-member-id'));
        createMembersList(model.members);
        createBoard(model.lists);
    }
}

function editMemberEventListener() {
    let btnEditMember = document.querySelectorAll('.btn-edit-member');
    let saveEdit = document.querySelectorAll('.btn-save-member');
    let cancelEdit = document.querySelectorAll('.btn-cancel-member');
    for (let i = 0; i < btnEditMember.length; i++) {
        btnEditMember[i].addEventListener('click', (event) => {
            event.target.parentElement.parentElement.style.display = 'none';
            event.target.parentElement.parentElement.parentElement.querySelector('.confirm-edit').style.display = 'flex';
        });
    }
    // todo : continiu
}

// init + event listeners

function init() {
    createMembersList(model.members);
    createBoard(model.lists);
    registerEvents();
}

function registerEvents() {
    document.addEventListener('click', (event) => {

        // board

        hideDeleteListBtn();

        if (event.target.classList.contains('list-options-toggle-btn')) {
            toggleDeleteList(event.target);
        }

        if (event.target.classList.contains('btn-dlt-list')) {
            deleteList(event.target);
        }

        // members

        if (event.target.classList.contains('btn-dlt-member')) {
            deleteMember(event.target);
        }

        if (event.target.classList.contains('btn-add-member')) {
            addMember();
        }
    });
}

// tabs

function showSection(section) {
    let btnNav = document.getElementsByClassName("btn-nav");
    if (section == 'board') {
        document.querySelector('.taskboard-board').style.display = "flex";
        document.querySelector('.members-container').style.display = "none";
        btnNav[0].style = "background-color: lightgray;";
        btnNav[1].style = "";
    }
    else {
        document.querySelector('.taskboard-board').style.display = "none";
        document.querySelector('.members-container').style.display = "block";
        btnNav[1].style = "background-color: lightgray;";
        btnNav[0].style = "";
    }
}

init();
