export const openCloseFormContact = () => {
    const contactBtn = document.querySelector(".btn_cta");
    const contactModal = document.querySelector(".modal_wrapper");
    const closeModal = document.querySelector(".btn_close");
    contactBtn.addEventListener("click", () => {
        contactModal.style.display = "flex";
        closeModal.focus();
    });
    closeModal.addEventListener("click", () => contactModal.style.display = "none");
    // Sélectionnez le premier et le dernier élément interactif de la modale
let firstInteractiveElement = document.querySelector('.modal_form .btn_close');
let lastInteractiveElement = document.querySelector('.modal_form .btn_submit');

// Ajoutez un écouteur d'événements keydown à la modale
document.querySelector('.modal_form').addEventListener('keydown', function(e) {
  // Vérifiez si la touche Tab est pressée
  if (e.key === 'Tab') {
    // Si l'utilisateur est sur le dernier élément interactif et appuie sur Tab
    if (document.activeElement === lastInteractiveElement && !e.shiftKey) {
      // Empêchez le comportement par défaut (tabulation vers le prochain élément de la page)
      e.preventDefault();
      // Redirigez le focus vers le premier élément interactif de la modale
      firstInteractiveElement.focus();
    }
    // Si l'utilisateur est sur le premier élément interactif et appuie sur Maj+Tab
    else if (document.activeElement === firstInteractiveElement && e.shiftKey) {
      // Empêchez le comportement par défaut (tabulation vers l'élément précédent de la page)
      e.preventDefault();
      // Redirigez le focus vers le dernier élément interactif de la modale
      lastInteractiveElement.focus();
    }
  }
    // Vérifiez si la touche Échap est pressée
    if (e.key === 'Escape') {
        // Cachez la modale
        contactModal.style.display = "none";
      }
});
};

export const validateForm = () => {
    const form = document.querySelector('.modal_form form');
    const firstName = document.querySelector("#firstname");
    const lastName = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const message = document.querySelector("#message");

    form.addEventListener('input', () => displayCustomMessage());

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!form.checkValidity()) displayCustomMessage();
        else {
            const formDatas = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                message: message.value,
            };
            console.log(JSON.stringify(formDatas));
            document.querySelectorAll('.formField').forEach(input => input.classList.remove('valid'));
            form.reset();
        };
    });

    //vérifie la validité d'une entrée utilisateur dans un champ de formulaire.
    const InputValidity = (input, regex) => {
        const errorMessage = input.dataset.error;
        const messageProvider = input.nextElementSibling;
        const isValid = regex.test(input.value);

        if(isValid) {
            messageProvider.innerHTML = "";
            messageProvider.removeAttribute("role");
            input.removeAttribute("aria-invalid");
        } else {
            messageProvider.innerHTML = errorMessage;
            messageProvider.setAttribute("role", "alert")
            input.setAttribute("aria-invalid", "true");
        }

        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid);
    };

    const displayCustomMessage = () => {
        const regexName = /^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/;
        const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexMessage = /^[A-Za-z0-9|\s]{20,200}$/;

        InputValidity(firstName, regexName);
        InputValidity(lastName, regexName);
        InputValidity(email, regexEmail);
        InputValidity(message, regexMessage);
    };
};