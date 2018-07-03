
// UI board

function createBoard(listsArr) {
    let listsHTML = '';
    for (const list of listsArr) {
        listsHTML += createList(list);
    }
    document.querySelector(".taskboard-board").innerHTML = listsHTML +
        '<button class="btn btn-info m-2 col-lg-2 text-left btn-add-list">Add a list...</button>';
}

function createList(list) {
    let cardsHTML = '';
    if (list.cards.length === 0) {
        cardsHTML = `<button class="btn btn-secondary btn-add-card" data-list-id="${list.id}">Add a card...</button>`
    }
    else {
        for (const card of list.cards) {
            cardsHTML += createCard(card, list.id);
        }
    }
    const listHTML = `<section class="card m-2 p-0 taskboard-list">

        <div class="d-flex card-header justify-content-between align-items-center">
            <div class="list-title-container">
                <h5 class="list-title show">${list.title}</h5>
                <input class="form-control form-control input-list-title" type="text" maxlength="14" placeholder="List Name" data-list-id="${list.id}">
            </div>
            <div class="position-relative btn-scroll">
                <button class="btn btn-light bg-white border list-options-toggle-btn">&#9662</button>
                <ul class="list-options-toggle">
                    <li>
                    <button class="btn btn-light bg-white border btn-dlt-list" data-list-id="${list.id}">Delete list</button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="card-body p-3">
            ${cardsHTML}
        </div>

        <div class="card-footer">
            <p class="mb-0 btn-add-card" data-list-id="${list.id}">Add a card...</p>
        </div>

    </section>`;
    return listHTML;
}

function createCard(card, listId) {
    let cardHTML = '';
    if (card.members.length == 0) {
        cardHTML = `<div class="border border-info rounded p-3 mb-3 taskboard-card">
        <button class="btn-edit-card" data-list-id="${listId}" data-card-id="${card.id}">Edit card</button>

        <p class="mb-4">${card.text}</p>

    </div>`;
    }
    else {
        const initialsHTML = createCardInitials(card.members);
        cardHTML = `<div class="border border-info rounded p-3 mb-3 taskboard-card">
        <button class="btn-edit-card" data-list-id="${listId}" data-card-id="${card.id}">Edit card</button>

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
        <input class="form-control form-control-lg mr-2 input-member" maxlength="25" type="text" placeholder="Add new member">
        <button class="btn btn-primary btn-add-member">Add</button>
    </li>`;
}

function createMember(member) {
    let memberHTML = `<li class="list-group-item member-li">
        <div class="member show-flex member-display">
            <span class="member-full-name">${member.fullName.trim()}</span>
            <div class="btn-hover">
                <button class="btn btn-info btn-edit-member" data-member-id="${member.id}">Edit</button>
                <button class="btn btn-danger btn-dlt-member" data-member-id="${member.id}">Delete</button>
            </div>
        </div>
        <div class="member confirm-edit">
            <input class="form-control form-control-lg mr-2 edit-member" type="text" maxlength="25">
            <div class="btn-confirm-edit">
                <button class="btn btn-light btn-cancel-member">Cancel</button>
                <button class="btn btn-success btn-save-member" data-member-id="${member.id}">Save</button>
            </div>
        </div>
    </li>`;
    return memberHTML;
}

// UI card modal

function createAddCardModal(listId) {
    let addCardPopupHTML = `<div class="modal-backdrop">
        </div>
    <div class="card-edit-container">
        <div class="card-edit-head">
            <h5>Add Card</h5>
            <button class="btn close-modal-btn">x</button>
        </div>
        <form class="card-edit-body">
            <section class="form-group row">
                <label class="col-md-2" for="cardText">Card text:</label>
                <textarea class="form-control col-md-10" id="cardText" rows="3" maxlength="350"></textarea>
            </section>
            <section class="row">
                <label class="col-md-2">Members:</label>
                <div class="card-members-input col-md-10">
                    ${createMembersForCardAdd()}
                </div>
            </section>
        </form>
        <div class="card-edit-footer">
            <button class="btn btn-secondary cancel-edit-card">Cancel</button>
            <button class="btn btn-primary save-add-card" data-list-id="${listId}">Save changes</button>
        </div>
    </div>`;
    document.querySelector('.card-edit-wrapper').innerHTML = addCardPopupHTML;
    document.querySelector('.card-edit-wrapper').classList.add('show');
    document.querySelector('.modal-backdrop').classList.add('show');
}

function createEditCardModal(cardId, listId) {
    let addCardPopupHTML = `<div class="modal-backdrop">
        </div>
    <div class="card-edit-container">
        <div class="card-edit-head">
            <h5>Add Card</h5>
            <button class="btn close-modal-btn">x</button>
        </div>
        <form class="card-edit-body">
            <section class="form-group row">
                <label class="col-md-2" for="cardText">Card text:</label>
                <textarea class="form-control col-md-10" id="cardText" rows="3" maxlength="350">${model.getCardById(cardId).text}</textarea>
            </section>
            <section class="form-group row">
                <label class="col-md-2" for="moveTo">Move to:</label>
                <select class="form-control col-md-10" id="moveTo">
                    ${createListsForCardEdit(listId)}
                </select>
            </section>
            <section class="row">
                <label class="col-md-2">Members:</label>
                <div class="card-members-input col-md-10">
                    ${createMembersForCardEdit(cardId)}
                </div>
            </section>
            <button class="btn btn-danger btn-dlt-card" data-card-id="${cardId}" data-list-id="${listId}">Delete card</button>
        </form>
        <div class="card-edit-footer">
            <button class="btn btn-secondary cancel-edit-card">Cancel</button>
            <button class="btn btn-primary save-edit-card" data-list-id="${listId}" data-card-id="${cardId}">Save changes</button>
        </div>
    </div>`;
    document.querySelector('.card-edit-wrapper').innerHTML = addCardPopupHTML;
    document.querySelector('.card-edit-wrapper').classList.add('show');
    document.querySelector('.modal-backdrop').classList.add('show');
}

function createMembersForCardAdd() {
    let membersForCardAddHTML = '';
    for (const member of model.members) {
        let memberForCardAddHTML = `<div class="form-check">
            <input class="form-check-input" type="checkbox" id="${member.id}">
            <label class="form-check-label" for="${member.id}">
                ${member.fullName}
            </label>
        </div>`;
        membersForCardAddHTML += memberForCardAddHTML;
    }
    return membersForCardAddHTML;
}

function createListsForCardEdit(listId) {
    let listsForCardEditHTML = '';
    for (const list of model.lists) {
        let listForCardAddHTML = '';
        if (list.id === listId) {
            listForCardAddHTML = `<option data-list-id="${list.id}" selected>${list.title}</option>`;
        }
        else {
            listForCardAddHTML = `<option data-list-id="${list.id}">${list.title}</option>`;
        }
        listsForCardEditHTML += listForCardAddHTML;
    }
    return listsForCardEditHTML;
}

function createMembersForCardEdit(cardId) {
    let checkedMembers = model.getCardById(cardId).members;
    let membersForCardEditHTML = '';
    for (let i = 0; i < model.members.length; i++) {
        let memberTest = 0;
        let memberForCardEditHTML = '';
        for (let j = 0; j < checkedMembers.length; j++) {
            if (model.members[i].id === checkedMembers[j]) {
                memberTest++;
            }
        }
        if (memberTest === 1) {
            memberForCardEditHTML = `<div class="form-check">
                <input class="form-check-input" type="checkbox" id="${model.members[i].id}" checked>
                <label class="form-check-label" for="${model.members[i].id}">
                    ${model.members[i].fullName}
                </label>
            </div>`;
        }
        else {
            memberForCardEditHTML = `<div class="form-check">
                <input class="form-check-input" type="checkbox" id="${model.members[i].id}">
                <label class="form-check-label" for="${model.members[i].id}">
                    ${model.members[i].fullName}
                </label>
            </div>`;
        }
        membersForCardEditHTML += memberForCardEditHTML;
    }
    return membersForCardEditHTML;
}

// board functions

// lists

function addList() {
    model.addList();
    createBoard(model.lists);
    let listsTitle = document.querySelectorAll('.list-title');
    editListTitle(listsTitle[listsTitle.length - 1]);
}

function editListTitle(eventTarget) {
    let titleElement = eventTarget.parentElement;
    let input = eventTarget.parentElement.querySelector('.input-list-title');
    const listId = input.getAttribute('data-list-id');
    showTitleEdit(titleElement);
    input.value = model.getListById(listId).title;
    input.addEventListener('blur', (event) => {
        hideTitleEdit(titleElement);
        changeTitle(input.value, listId);
    });
}

function changeTitle(input, listId) {
    if (input != model.getListById(listId).title) {
        model.editListTitle(input, listId)
        createBoard(model.lists);
    }
    if (input === '') {
        model.editListTitle('(no title)', listId)
        createBoard(model.lists);
    }
}

function showTitleEdit(element) {
    element.classList.add('show-title-edit');
    element.querySelector('h5').classList.remove('show');
    element.querySelector('input').classList.add('show');
}

function hideTitleEdit(element) {
    element.classList.remove('show-title-edit');
    element.querySelector('h5').classList.add('show');
    element.querySelector('input').classList.remove('show');
}

function hideAllTitleEdit() {
    let titleElements = document.querySelectorAll('.list-title-container');
    let input = document.querySelectorAll('.input-list-title');
    for (let i = 0; i < titleElements.length; i++) {
        if (titleElements[i].classList.contains('show-title-edit')) {
            hideTitleEdit(titleElements[i]);
            changeTitle(input[i].value, input[i].getAttribute('data-list-id'))
        }
    }
}

function toggleDeleteList(eventTarget) {
    eventTarget.parentElement.querySelector('.list-options-toggle').classList.toggle('show');
    eventTarget.classList.toggle('extended');
}

function hideDeleteListBtn(eventTarget) {
    if (!eventTarget.classList.contains('list-options-toggle-btn') || !eventTarget.classList.contains('extended')) {
        let btnDeleteList = document.querySelectorAll('.list-options-toggle');
        let btnDeleteListToggle = document.querySelectorAll('.list-options-toggle-btn');
        for (const btn of btnDeleteList) {
            btn.classList.remove('show');
        }
        for (const btn of btnDeleteListToggle) {
            btn.classList.remove('show');
        }
    }
}

function deleteList(eventTarget) {
    if (confirm('Are you sure?')) {
        model.deleteList(eventTarget.getAttribute('data-list-id'));
        createBoard(model.lists);
    }
}

//cards

function addCard(eventTarget) {
    createAddCardModal(eventTarget.getAttribute('data-list-id'));
    document.querySelector('.save-add-card').addEventListener('click', (event) => {
        let listId = event.target.getAttribute('data-list-id');
        let cardText = document.querySelector('#cardText').value;
        let cardMembers = getMembersFromModal(document.querySelectorAll('.card-members-input input'));
        if (cardText !== '') {
            model.addCard(cardText, cardMembers, listId);
            hideCardEditModal();
            createBoard(model.lists);
        }
        else {
            alert('Please enter card text first');
        }
    });
}

function editCard(eventTarget) {
    createEditCardModal(eventTarget.getAttribute('data-card-id'), eventTarget.getAttribute('data-list-id'));
    document.querySelector('.save-edit-card').addEventListener('click', (event) => {
        let cardId = event.target.getAttribute('data-card-id');
        let listIdOld = event.target.getAttribute('data-list-id');
        let cardText = document.querySelector('#cardText').value;
        let cardMembers = getMembersFromModal(document.querySelectorAll('.card-members-input input'));
        let listIdNew = getListIdNew(document.querySelectorAll('#moveTo option'));
        if (cardText !== '') {
            model.editCard(cardId, cardText, cardMembers, listIdOld, listIdNew);
            hideCardEditModal();
            createBoard(model.lists);
        }
        else {
            alert('Please enter card text first');
        }
    });
    document.querySelector('.btn-dlt-card').addEventListener('click', (event) => {
        if (confirm('Are you sure?')) {
            model.deleteCard(event.target.getAttribute('data-card-id'), event.target.getAttribute('data-list-id'))
            hideCardEditModal();
            createBoard(model.lists);
        }
    });
}

function getMembersFromModal(input) {
    let members = [];
    for (const i of input) {
        if (i.checked) {
            members.push(i.getAttribute('id'));
        }
    }
    return members;
}

function getListIdNew(input) {
    for (const i of input) {
        if (i.selected) {
            return i.getAttribute('data-list-id');
            break;
        }
    }
}

function hideCardEditModal() {
    document.querySelector('.card-edit-wrapper').classList.remove('show');
    document.querySelector('.modal-backdrop').classList.remove('show');
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

function editMember(eventTarget) {
    let memberEdit = eventTarget.parentElement.parentElement.parentElement.querySelector('.confirm-edit');
    let memberInput = eventTarget.parentElement.parentElement.parentElement.querySelector('.edit-member');
    let memberDisplay = eventTarget.parentElement.parentElement;
    memberInput.value = memberDisplay.querySelector('.member-full-name').innerText;
    memberEdit.classList.add('show-flex');
    memberDisplay.classList.remove('show-flex');
    memberEdit.querySelector('.btn-save-member').addEventListener('click', (event) => {
        if (confirm('Are you sure?')) {
            model.editMember(memberInput.value, event.target.getAttribute('data-member-id'));
            createMembersList(model.members);
            createBoard(model.lists);
            hideEditMember();
        }
    });
}

function hideEditMember() {
    let memberEdit = document.querySelectorAll('.confirm-edit');
    let memberDisplay = document.querySelectorAll('.member-display');
    for (let i = 0; i < memberEdit.length; i++) {
        memberEdit[i].classList.remove('show-flex');
        memberDisplay[i].classList.add('show-flex');
    }
}

function deleteMember(eventTarget) {
    if (confirm('Are you sure?')) {
        model.deleteMember(eventTarget.getAttribute('data-member-id'));
        createMembersList(model.members);
        createBoard(model.lists);
    }
}

// init + events

function init() {
    createMembersList(model.members);
    createBoard(model.lists);
    registerEvents();
}

function registerEvents() {
    document.addEventListener('click', (event) => {

        // board

        hideDeleteListBtn(event.target);

        if (event.target.classList.contains('btn-add-list')) {
            addList();
        }

        if (!event.target.classList.contains('input-list-title')) {
            hideAllTitleEdit();
        }

        if (event.target.classList.contains('list-title')) {
            editListTitle(event.target);
        }

        if (event.target.classList.contains('list-options-toggle-btn')) {
            toggleDeleteList(event.target);
        }

        if (event.target.classList.contains('btn-dlt-list')) {
            deleteList(event.target);
        }

        if (event.target.classList.contains('btn-add-card')) {
            addCard(event.target);
        }

        if (event.target.classList.contains('cancel-edit-card') || event.target.classList.contains('close-modal-btn') || event.target.classList.contains('modal-backdrop')) {
            hideCardEditModal();
        }

        if (event.target.classList.contains('btn-edit-card')) {
            editCard(event.target);
        }

        // members

        if (event.target.classList.contains('btn-add-member')) {
            addMember();
        }

        if (!event.target.classList.contains('confirm-edit') && !event.target.classList.contains('edit-member') && !event.target.classList.contains('member-li') && !event.target.classList.contains('btn-save-member')) {
            hideEditMember();
        }

        if (event.target.classList.contains('btn-edit-member')) {
            editMember(event.target);
        }

        if (event.target.classList.contains('btn-dlt-member')) {
            deleteMember(event.target);
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
