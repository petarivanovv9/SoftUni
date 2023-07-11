const views = Array.from(document.querySelectorAll('.view-section'));

function hideAllViews() {
    views.forEach(v => v.style.display = 'none');
}

export function displayView(section) {
    hideAllViews();

    section.style.display = 'block';
}

export function elementFactory(type, attributes, ...children) {
    const el = document.createElement(type);

    for (const attribute in attributes) {
        const attributeValue = attributes[attribute];

        el.setAttribute(attribute, attributeValue);
    }

    children.forEach(child => {
        if (typeof child === 'string') {
            el.appendChild(document.createTextNode(child));
        } else {
            el.appendChild(child);
        }
    })

    return el;
}

export function updateNav() {
    const user = JSON.parse(localStorage.getItem('user'));
    const msgContainer = document.getElementById('welcome-msg');

    if (user) {
        msgContainer.textContent = `Welcome, ${user.email}`;

        document.querySelectorAll('.user')
            .forEach(e => e.style.display = 'inline-block');
            document.querySelectorAll('.guest')
            .forEach(e => e.style.display = 'none');
    } else {
        msgContainer.textContent = '';

        document.querySelectorAll('.guest')
            .forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.user')
            .forEach(e => e.style.display = 'none');
    }
}