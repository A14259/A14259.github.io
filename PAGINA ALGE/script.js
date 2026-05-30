// Animación al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .benefit-card, .feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(element);
    });
});

// WhatsApp Button Functionality
        const whatsappButton = document.getElementById('whatsappButton');
        const questionsContainer = document.getElementById('questionsContainer');
        const questionItems = document.querySelectorAll('.question-item');
        
        // Reemplaza con tu número de WhatsApp (formato: 521234567890)
        const whatsappNumber = '521234567890';
        
        // Mostrar/ocultar preguntas al hacer clic en el botón
        whatsappButton.addEventListener('click', function() {
            questionsContainer.classList.toggle('show');
            this.classList.toggle('active');
        });
        
        // Manejar selección de pregunta
        questionItems.forEach(item => {
            item.addEventListener('click', function() {
                const question = this.getAttribute('data-question');
                const message = encodeURIComponent(`Hola, tengo una consulta: ${question}`);
                
                // Abrir WhatsApp con el mensaje predefinido
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
                
                // Cerrar el contenedor de preguntas
                questionsContainer.classList.remove('show');
                whatsappButton.classList.remove('active');
            });
        });
        
        // Cerrar preguntas al hacer clic fuera
        document.addEventListener('click', function(event) {
            const isButton = whatsappButton.contains(event.target);
            const isContainer = questionsContainer.contains(event.target);
            
            if (!isButton && !isContainer && questionsContainer.classList.contains('show')) {
                questionsContainer.classList.remove('show');
                whatsappButton.classList.remove('active');
            }
        });