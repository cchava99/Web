// Menú hamburguesa
const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

// Mostrar/Ocultar el formulario flotante
const openContact = document.getElementById('open-contact-form');
const contactFormWrapper = document.getElementById('contact-form');

if (openContact && contactFormWrapper) {
  openContact.addEventListener('click', (e) => {
    e.preventDefault(); // evitar el scroll
    contactFormWrapper.classList.add('visible'); // Mostrar el formulario
  });
}

// Envío de formulario a Google Sheets
const form = document.querySelector('#contact-form form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = form.querySelector('input[name="nombre"]')?.value || '';
    const correo = form.querySelector('input[name="correo"]')?.value || '';
    const celular = form.querySelector('input[name="celular"]')?.value || '';
    const mensaje = form.querySelector('textarea[name="mensaje"]')?.value || '';

    let status = document.getElementById('form-status');
    if (!status) {
      status = document.createElement('p');
      status.id = 'form-status';
      form.appendChild(status);
    }

    const endpoint = 'https://script.google.com/macros/s/AKfycby6UOS-tE7bTBD2i_Kw9EmdESu30YKp_uuf23Cud72TCTHVXi7CzbLIpX9MOiOjF9CtRA/exec'; // ← Reemplaza si cambias tu script

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // ⚠️ Esto evita el error CORS
        body: JSON.stringify({ nombre, correo, celular, mensaje }),
      });

      const result = await response.json();

      if (result.result === 'Éxito') {
        status.textContent = '✅ Mensaje enviado con éxito.';
        form.reset();
      } else {
        status.textContent = '❌ Error al enviar el mensaje.';
      }
    } catch (err) {
      console.error('Error al enviar datos:', err);
      status.textContent = '❌ Ocurrió un problema al enviar el formulario.';
    }
  });
}


