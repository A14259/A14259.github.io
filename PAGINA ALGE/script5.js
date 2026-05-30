// Form submission handling
        document.getElementById('cotizacionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            alert('¡Gracias por su solicitud! Nos pondremos en contacto con usted en breve.');
            
            // Reset form
            this.reset();
        });
        
        // Mobile menu toggle
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
        
        // Responsive menu adjustment
        window.addEventListener('resize', function() {
            const navLinks = document.querySelector('.nav-links');
            if (window.innerWidth > 768) {
                navLinks.style.display = 'flex';
            } else {
                navLinks.style.display = 'none';
            }
        });