
// UI board

function createBoard(listsArr) {
    let listsHTML = '';
    for (const list of listsArr) {
        listsHTML += createList(list);
    }
    document.querySelector(".taskboard-board").innerHTML = listsHTML +
        '<button class="btn btn-info m-2 col-lg-2 text-left btn-add">Add a list...</button>';
    deleteListEventListener();
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
                <button class="btn btn-light bg-white border">&#9662</button>
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

createBoard(model.lists);

// UI members

function createMembersList(members) {
    let membersHTML = '';
    for (const member of members) {
        membersHTML += createMember(member);
    }
    document.querySelector(".members-list").innerHTML = membersHTML +
    `<li class="list-group-item d-flex align-content-center">
        <input class="form-control form-control-lg mr-2" type="text" placeholder="Add new member">
        <button class="btn btn-primary">Add</button>
    </li>`;
    deleteMemberEventListener();
}

function createMember(member) {
    let memberHTML = `<li class="list-group-item member">
        <span>${member.fullName.trim()}</span>
        <div class="btn-hover">
            <button class="btn btn-info btn-edit-member" data-member-id="${member.id}">Edit</button>
            <button class="btn btn-danger btn-dlt-member" data-member-id="${member.id}">Delete</button>
        </div>
    </li>`;
    return memberHTML;
}

createMembersList(model.members);

// board functions

function deleteListEventListener() {
    let btnScroll = document.querySelectorAll('.btn-scroll');
    let btnDltList = document.querySelectorAll('.btn-dlt-list');
    for (let i = 0; i < btnScroll.length; i++) {
        btnScroll[i].addEventListener('click', (event) => {
            event.target.parentElement.querySelector('.btn-dlt-list').style.display = 'block';
        });
        btnScroll[i].addEventListener('mouseleave', (event) => {
            event.target.parentElement.querySelector('.btn-dlt-list').style.display = 'none';
        });
        btnDltList[i].addEventListener('click', (event) => {
            model.deleteList(event.target.getAttribute('data-list-id'));
        });
    }
}

// members functions

function deleteMemberEventListener() {
    let btnDltMember = document.querySelectorAll('.btn-dlt-member');
    for (let i = 0; i<btnDltMember.length; i++) {
        btnDltMember[i].addEventListener('click', (event) => {
            model.deleteMember(event.target.getAttribute('data-member-id'));
        })
    }
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
