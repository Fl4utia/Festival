
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();

}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if ( sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll')
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlance =>{
        enlance.addEventListener('click', function(e){
            e.preventDefault();
            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: "smooth"});
        })
    })
}

function crearGaleria (){
    const galeria = document.querySelector('.galeria-imagenes');
    
    for(let i = 1 ; i <= 12 ; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="/build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="/build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="/build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        } //se hace como callback pq si pones =mostrarImagen(id) se llaman todas al msimo tiempo
        galeria.appendChild(imagen);
    }
}

function mostrarImagen (id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="/build/img/grande/${id}.avif" type="image/avif">
    <source srcset="/build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="/build/img/grande/${id}.jpg" alt="Imagen galeria">
    `;
    //CREA OVERLAY CON LA IMAGEN
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick= function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }


    overlay.appendChild(cerrarModal)

    //lo añade a html
    const body = document.querySelector('body');
    body.appendChild(overlay)
    body.classList.add('fijar-body');
}