function renderCards(cmp) {
    if (!cmp) return;

    // Create a single container for all card-items
    var container = document.createElement('div');
    container.className = 'container';

    // Get all card-items
    var cardItems = Array.from(cmp.querySelectorAll('.cards > div'));
    

    cardItems.forEach(function(cardItem) {
        var children = Array.from(cardItem.children);
        cardItem.className = 'card-item';

        //  Image div
        if (children[0]) {
            children[0].className += ' card-image';
        }

        //  Convert second div → h3
        if (children[1]) {
            var headingText = children[1].textContent;
            var heading = document.createElement('h3');
            heading.className = 'card-heading';
            heading.textContent = headingText;
            cardItem.replaceChild(heading, children[1]);
        }

        //  Convert third div → paragraph
        if (children[2]) {
            var descText = children[2].textContent;
            var paragraph = document.createElement('p');
            paragraph.className = 'card-description';
            paragraph.textContent = descText;
            cardItem.replaceChild(paragraph, children[2]);
        }

        // Move the processed card-item into the container
        container.appendChild(cardItem);
    });

    // Append the container to the main .cards element
    cmp.appendChild(container);
}

export default renderCards;
