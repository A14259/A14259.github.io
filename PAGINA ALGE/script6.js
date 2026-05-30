// Script para manejar el envío del formulario
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría la lógica para enviar el formulario
            // En este ejemplo simplemente mostramos una alerta
            alert('¡Gracias por tu mensaje! Te responderemos lo antes posible.');
            
            // Limpiar el formulario
            this.reset();
        });
