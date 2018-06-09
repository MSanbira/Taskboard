
const lists = [
    {
        title: 'Todo',
        cards: [
            {
                text: 'wash the dishes',
                members: [
                    'kumumk', 'vfvfefv'
                ]
            },
            {
                text: 'Do De LANDRY',
                members: [
                    'kumumk'
                ]
            },
            {
                text: 'here is anouther card to put on the list to finally see if the css is worcking ok, and there are no members. just a few more words to see what happends',
                members: []
            }
        ]
    },
    {
        title: 'done',
        cards: [
            {
                text: 'btn game',
                members: [
                    'kumumk'
                ]
            },
            {
                text: 'macking a nice breackfest for my wife',
                members: [
                    'kumumk'
                ]
            }
        ]
    },
    {
        title: 'in prog',
        cards: [
            {
                text: 'Transatlantic is the best band!',
                members: []
            }
        ]
    },
    {
        title: 'one more',
        cards: [
            {
                text: 'ok cool',
                members: []
            }
        ]
    }
];

const members = [
    {
        id: 'kumumk',
        fullName: 'Matan Nahoom Sanbira'
    },
    {
        id: 'vfvfefv',
        fullName: 'Dima V'
    }
];

function createBoard(listsArr) {
    let listsHTML = '';
    for (const list of listsArr) {
        listsHTML += createList(list);
    }
    document.querySelector(".taskboard-board").innerHTML = listsHTML + document.querySelector(".taskboard-board").innerHTML;
}

function createList(list) {
    let cardsHTML = '';
    for (const card of list.cards) {
        cardsHTML += createCard(card);
    }
    const listHTML = `<section class="card m-2 p-0 taskboard-list">

        <div class="d-flex card-header justify-content-between align-items-center">
            <h5>${list.title}</h5>
            <button class="btn btn-light bg-white border">&#9662</button>
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
        initialsHTML += `<span class="card-member">${createInitials(cardMember)}</span>`;
    }
    return initialsHTML;
}

function createInitials(fullName) {
    fullName = fullName.trim();
    let initials = "";
    let nameArr = fullName.split(" ");
    for (const name of nameArr) {
        initials += name.charAt(0);
    }
    return initials.toUpperCase();
}

function findMemberById(searchId) {
    for (const member of members) {
        if (searchId == member.id) {
            return member.fullName;
            break;
        }
    }
}

createBoard(lists);
