let currentDraggedItem;

const tierInput = document.getElementById('tier');
const submitBtn = document.getElementById('submit');
const imageForm = document.getElementById('image-form');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (tierInput.value === '') {
        alert('Please enter a tier name');
        return;
    }
    createTierList(tierInput.value);
    tierInput.value = '';
});

imageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const imageItemInput = document.getElementById('image-item');
    if (imageItemInput.value === '') {
        alert('Please enter a valid image url');
        return;
    }
    createTierListItem(imageItemInput.value);
    imageItemInput.value = '';
});

function createTierList(tierListName) {
    const newTierList = document.createElement('div');
    newTierList.classList.add('tier-list');

    const heading = document.createElement('div');
    heading.classList.add('heading');
    const textContainer = document.createElement('div');
    textContainer.textContent = tierListName;
    heading.appendChild(textContainer);

    const newTierListItems = document.createElement('div');
    newTierListItems.classList.add('tier-list-items');

    setUpDropZoneInTierListItem(newTierListItems);

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItems);

    document.getElementById('tier-list-section').appendChild(newTierList);
}

function createTierListItem(imageUrl) {
    const imageDiv = document.createElement('div');
    imageDiv.setAttribute('draggable', 'true');
    imageDiv.classList.add('item-container');

    setUpItemContainerForDrag(imageDiv);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.draggable = false;

    imageDiv.appendChild(img);
    document.getElementById('non-tier-section').appendChild(imageDiv);
}

function setUpItemContainerForDrag(itemContainer) {
    itemContainer.addEventListener('dragstart', (event) => {
        currentDraggedItem = event.target;
        event.dataTransfer.effectAllowed = 'move';
    });

    itemContainer.addEventListener('dragend', () => {
        currentDraggedItem = null;
    });

    itemContainer.addEventListener('dblclick', (event) => {
        const itemContainer = event.currentTarget;
        const nonTierSection = document.getElementById('non-tier-section');
        nonTierSection.appendChild(itemContainer);
    });
}

function setUpDropZoneInTierListItem(tierListItem) {
    tierListItem.addEventListener('dragover', (event) => {
        event.preventDefault();
        tierListItem.classList.add('dragover');
    });

    tierListItem.addEventListener('dragleave', () => {
        tierListItem.classList.remove('dragover');
    });

    tierListItem.addEventListener('drop', (event) => {
        event.preventDefault();
        tierListItem.classList.remove('dragover');
        if (currentDraggedItem && currentDraggedItem.parentNode !== tierListItem) {
            tierListItem.appendChild(currentDraggedItem);
        }
    });
}
