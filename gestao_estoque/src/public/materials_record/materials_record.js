// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      } else {
        // Verificar se pelo menos um dos checkboxes está marcado
        const checkboxes = form.querySelectorAll('input[type="radio"]');
        let isChecked = false;
        checkboxes.forEach(checkbox => {
          if (checkbox.checked) {
            isChecked = true;
          }
        });
        if (!isChecked) {
          alert('Por favor, indique se o material é direto ou indireto.');
          event.preventDefault(); // Impede o envio do formulário
          event.stopPropagation();
        }
      }

      form.classList.add('was-validated')
    }, false)
  })

  // Função para voltar à página anterior
  const goBackButton = document.getElementById('goBackButton');

  goBackButton.addEventListener('click', () => {
    window.history.back();
  });
})()
