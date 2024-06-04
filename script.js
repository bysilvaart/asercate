// script.js
document.addEventListener('DOMContentLoaded', function () {
    emailjs.init('7o04NQlU2cySHvB1g');
    
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
        const cambioResidencia = document.getElementsByName('cambio-residencia').value;
        const english = document.getElementsByName('english').value;
        const file = document.getElementById('file').value;
        
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
            file: file
        };
        
        emailjs.send('service_z00tgz7', 'template_hbbqas9', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('status').innerHTML = 'Hemos enviado tu postulación';
                form.reset();
            }, function (error) {
                console.log('FAILED...', error);
                document.getElementById('status').innerHTML = 'Tuvimos un error al enviar el mensaje';
            });
    });
});
