document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('CEjUS8rrtcdM4QzJN');
    
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const code = document.getElementById('code').innerHTML;
        const rol = document.getElementById('rol').innerHTML;
        const name = document.getElementById('name').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const comuna = document.getElementById('comuna').value;
        const profesion = document.getElementById('profesion').value;
        const rent = document.getElementById('rent').value;
        const experience = document.getElementById('experience').value;
        const cambioResidenciaElement = document.querySelector('input[name="cambioResidencia"]:checked');
        const cambioResidencia = cambioResidenciaElement ? cambioResidenciaElement.value : '';
        const englishElement = document.querySelector('input[name="english"]:checked');
        const english = englishElement ? englishElement.value : '';
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0]; // Obtener el primer archivo seleccionado

        const modal = document.getElementById('modal_status');
        var closeModal = document.getElementsByClassName("close-modal")[0];
        modal.setAttribute('style', 'display: flex');
        document.getElementById('status').innerHTML = 'Estamos enviando tu postulación';
        closeModal.addEventListener("click",function() {
            modal.setAttribute('style', 'display: none');
          });

        // Verificar si se ha seleccionado un archivo
        if (file) {
            // Crear un FileReader
            const reader = new FileReader();
            
            // Configurar el evento onload para leer el contenido del archivo cuando esté disponible
            reader.onload = function (event) {
                const fileData = event.target.result; // Contenido del archivo en base64
                sendEmail(code, rol, name, lastname, email, comuna, profesion, rent, experience, cambioResidencia, english, fileData);
            };

            // Leer el contenido del archivo como base64
            reader.readAsDataURL(file);
        } else {
            // Si no se selecciona ningún archivo, enviar el formulario sin el archivo adjunto
            sendEmail(code, rol, name, lastname, email, comuna, profesion, rent, experience, cambioResidencia, english, null);
        }
    

        
        // Función para enviar el formulario con EmailJS
        function sendEmail(code, rol, name, lastname, email, comuna, profesion, rent, experience, cambioResidencia, english, fileData) {
            const templateParams = {
                code: code,
                rol: rol,
                name: name,
                lastname: lastname,
                email: email,
                comuna: comuna,
                profesion: profesion,
                rent: rent,
                experience: experience,
                cambioResidencia: cambioResidencia,
                english: english,
                file: fileData // Enviar el contenido del archivo como base64
            };

            
            emailjs.sendForm('service_phqxof8', 'template_agzjuwy', form).then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                    document.getElementById('status').innerHTML = 'Hemos enviado tu postulación';
                    closeModal.setAttribute('style', 'display: flex');
                    console.log(form);
                    form.reset();
                })
                .catch(function (error) {
                    console.log('FAILED...', error);
                    document.getElementById('status').innerHTML = 'Tuvimos un error al enviar el mensaje';
                    modal.setAttribute('style', 'display: flex');
                });
        }
    });
});