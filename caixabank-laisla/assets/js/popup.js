document.getElementById('popup').addEventListener('click', closePopup);

function openPopup() {
    document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    // Stop video playback
    var videoFrame = document.getElementById('video-frame');
    videoFrame.src = '';
}

function changeContent(territory, initialLoad = false) {
    var territoryInfo = {};
    switch (territory) {
        case 'mayores':
            territoryInfo = {
                mainImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/mayores-mapa.svg',
                additionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/mayores-img.png',
                mobileAdditionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/mayores-img-mobile.png',
                title: 'MAYORES',
                description: 'Donde los veteranos tienen su mundo a medida',
                listItems: [
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon1.svg" alt="Small Image"><span>Se le conoce también como <a href="https://www.caixabank.es/particular/caixabank-seniors/programa-caixabank-seniors.html" target="_blank" rel="nofollow"> CaixaBank Séniors.</a></span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon2.svg" alt="Small Image"><span>Lo habitan personas mayores.</span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon3.svg" alt="Small Image"><span>Se trata de un lugar con atención personalizada donde los productos y servicios están adaptados a su perfil. Algo que es posible gracias a los más de <strong>1.600 gestores especializados</strong> en el segmento sénior.</span></li>'
                ],
                paragraph1: '· Ofertas financieras exclusivas: Protección Sénior, MyBox Salud, etc.<br><br>· Ventajas no financieras y experiencia de ocio, salud y cultura.<br><br>· Acompañamiento para facilitar a los mayores el acceso a las novedades tecnológicas y asistencia en los nuevos modelos de relación.<br><br>· Protocolos de inclusión financiera y horario de caja sin restricciones.<br><br>· Eventos especializados para el colectivo.',
                paragraph2: '· Formación presencial con más de 5.200 sesiones presenciales.<br><br>· Más de 11.000 cajeros de uso fácil y acompañamiento personal en el uso de cajeros.<br><br>· Atención personal mediante un teléfono exclusivo (900 365065) y WhatsApp.<br><br>· Servicio de ofimóviles en 783 municipios para no abandonar a las poblaciones en las que la mayoría de las personas supera los 65 años.'
            };
            break;
        case 'ruralidad':
            territoryInfo = {
                mainImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/ruralidad-mapa.svg',
                additionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/ruralidad-img.png',
                mobileAdditionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/ruralidad-img-mobile.png',
                videoUrl: 'https://www.youtube.com/embed/epvQDcmC4Os?si=YfnA46tRuqNDMFSd',
                title: 'RURALIDAD',
                description: 'Donde se impulsa la economía rural',
                listItems: [
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon1.svg" alt="Small Image"><span>Se le conoce también como<a href="https://www.caixabank.es/empresa/agrobank/agrobank_es.html" target="_blank" rel="nofollow"> AgroBank.</a></span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon2.svg" alt="Small Image"><span>Lo habitan personas del medio rural.</span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon3.svg" alt="Small Image"><span>Se trata de un territorio donde se apoya el desarrollo económico.</span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon4.svg" alt="Small Image"><span>Un compromiso con el desarrollo de las zonas rurales que se materializa gracias a <strong>la red de oficinas más amplia de España y presencia en más de 2.230 municipios.</strong> Esta capilaridad de la red permite a la CaixaBank llegar a prácticamente todos los rincones del país y ser <strong>la única entidad financiera en 483 municipios</strong> con los que tiene, además, el compromiso de no abandonar el servicio.</span></li>'
                ],
                paragraph1: '· Una red de 1.150 oficinas especializadas y más de 3.000 gestores que ofrecen la atención que requieren tanto el sector agrario como el ámbito rural.<br><br>· Ayudas para la digitalización del sector primario y acceso a la innovación. <br><br>· Financiación adaptada con criterios de riesgo diferentes al retail o a otros segmentos. En 2023, AgroBank ha financiado al sector agroalimentario con cerca de 28.500MM€.<br><br>· Inclusión financiera a través de la elaboración de información de alta calidad en el sector.<br><br>',
                paragraph2: '· Productos específicos, mayor flexibilidad y soluciones adaptadas a cada territorio.<br><br>· Diversidad y, concretamente, acceso de las mujeres al sector primario.<br><br>· Estímulos económicos mediante la ocupación y el emprendimiento, para luchar contra la despoblación.<br><br>· Formación y organización de actos para apoyar al sector. <br><br>· Por otra parte, 18 oficinas móviles en 783 municipios para cubrir aquellas poblaciones sin sucursales bancarias.<br><br>'
            };
            break;
        case 'formacion':
            territoryInfo = {
                mainImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/formacion-mapa.svg',
                additionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/formacion-img.png',
                mobileAdditionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/formacion-img-mobile.png',
                videoUrl: 'https://www.youtube.com/embed/WG9_ALXU8lQ?si=1kJzcm18qx11T_x5',
                title: 'Formación FP',
                description: 'Donde la educación garantiza un futuro',
                listItems: ['<li><img src="assets/img/icon1.svg" alt="Small Image"><span>Se le conoce también como <a href="https://www.caixabankdualiza.es/" target="_blank" rel="nofollow"> CaixaBank Dualiza.</a></span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon2.svg" alt="Small Image"><span>Lo habitan jóvenes que reciben una educación para lograr un empleo y un futuro.</span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon3.svg" alt="Small Image"><span>Se trata de un lugar donde se impulsa la visibilización de la realidad de la FP como una vía para paliar el desempleo juvenil en España, el más alto de Europa. </span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon4.svg" alt="Small Image"><span>CaixaBank es la única entidad bancaria con programas de formación profesional dual que ha involucrado a <strong>1.747 docentes, 944 centros y 6.905 alumnos en 2023.</strong></span></li>'
                ],
                paragraph1: '· Docentes que actualizan sus competencias para que la formación esté cerca de la realidad del mercado. <br><br>· Transferencia de conocimiento en lugares de encuentro y diálogo a través de la organización de jornadas, foros o congresos.  <br><br>· Investigaciones propias sobre el estado real de la FP y su incidencia en la economía para que las decisiones futuras respecto a esta modalidad educativa puedan apoyarse en datos reales.<br><br>· Empleabilidad de los estudiantes gracias al acercamiento entre centros educativos y empresas, para que se conozcan y puedan impulsar proyectos conjuntos.<br><br>',
                paragraph2: '· Innovación mediante actividades de colaboración para la resolución de problemas reales. <br><br>· Economía local a través del impulso del talento que responda a sus necesidades. <br><br>· Impacto empresarial, ya que se acerca la FP a más de 1.000 empresas (en 2023), para que conozcan el potencial de esta modalidad formativa y la repercusión que puede tener sobre su personal y su desarrollo económico.<br><br>· Colaboración público-privada al potenciarse la actividad a favor de la FP entre la Administración pública y las entidades privadas.<br><br>'
            };
            break;
        case 'voluntariado':
            territoryInfo = {
                mainImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/voluntariado-mapa.svg',
                additionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/voluntariado-img.png',
                mobileAdditionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/voluntariado-img-mobile.png',
                title: 'VOLUNTARIADO',
                description: 'Donde se construye una sociedad mejor',
                listItems: [
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon1.svg" alt="Small Image"><span>Este territorio lo habitan personas solidarias.</span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon3.svg" alt="Small Image"><span>Se trata de un lugar donde los voluntarios hacen posible la solidaridad. Concretamente, <strong>más de 17.000 voluntarios</strong> que participan en causas (acciones transformadoras de alto impacto social y medioambiental positivo y escalable) lideradas por entidades sociales y cuyas actuaciones ya han llegado a <strong>más de 370.000 beneficiarios en 2023.</strong></span></li>'
                ],
                paragraph1: '· Una apuesta por las ideas de cambio que ayuden a mejorar la vida de las personas y favorezcan el desarrollo de las comunidades desatendidas a nivel local. <br><br>· Programas que cubren una gran variedad de necesidades de colectivos vulnerables.<br><br>· Formación que ayuda a superar limitaciones en entidades y programas que promueven la inclusión.<br><br>· Una herramienta de trabajo que permite potenciar el desarrollo de proyectos propios y también participar en los de otras organizaciones.<br><br>',
                paragraph2: '· Colaboración entre entidades sociales y la sociedad civil.<br><br>· Valor añadido a través del trabajo voluntario.<br><br>· Inclusión financiera mediante acuerdos con las fundaciones que tienen en su origen la responsabilidad social corporativa.<br><br>'
            };
            break;
        case 'emprendimiento':
            territoryInfo = {
                mainImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/emprendimiento-mapa.svg',
                additionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/emprendimiento-img.png',
                mobileAdditionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/emprendimiento-img-mobile.png',
                videoUrl: 'https://www.youtube.com/embed/eSiaIjV2oWw?si=6lF2pX8cS9uIQ2nW',
                title: 'EMPRENDIMIENTO',
                description: 'Donde nacen y crecen las ideas',
                listItems: [
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon1.svg" alt="Small Image"><span>Este territorio lo habitan personas emprendedoras.</span></li>',
                    '<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon3.svg" alt="Small Image"><span>Se trata de un lugar donde se impulsa el crecimiento económico a través del apoyo a <strong>más de 100.000 empresas</strong> (1 de cada 10 autónomos y empresas) y a la creación de empleo con <strong>más de 183.000 millones de euros en financiación empresarial</strong> en los últimos tres años.</span></li>'
                ],
                paragraph1: '· Herramientas y recursos para cada fase del proyecto emprendedor: desde la fase de maduración de la idea hasta la aceleración del negocio.<br><br>· Ayudas a través de los productos específicos para emprendedores, desde cuentas sin comisiones hasta préstamos con condiciones especiales.<br><br>· Formación y mentorización por parte de expertos que acompañan en el crecimiento del proyecto.<br><br>· Eventos, premios y reconocimientos a proyectos innovadores y de impacto en la sociedad.<br><br>',
                paragraph2: '· Colaboración con otras empresas y entidades para multiplicar las oportunidades de negocio.<br><br>· Acompañamiento en la transformación digital de las empresas, imprescindible para su éxito en el mercado.<br><br>· Financiación responsable con compromiso medioambiental y social.<br><br>'
            };
            break;
        default:
            territoryInfo = {};
    }

    // Update main image
var mainImage = document.getElementById('main-image');
mainImage.src = territoryInfo.mainImage;

// Update additional image
var additionalImage = document.getElementById('additional-image');
if (window.innerWidth <= 520 && territoryInfo.mobileAdditionalImage) {
    additionalImage.src = territoryInfo.mobileAdditionalImage;
} else {
    additionalImage.src = territoryInfo.additionalImage;
}

// Update title and description
document.getElementById('title').innerText = territoryInfo.title;
document.getElementById('description').innerText = territoryInfo.description;

// Update list items
const listItemsHTML = territoryInfo.listItems.join('');
document.getElementById('list').innerHTML = listItemsHTML;

// Update paragraphs
document.getElementById('paragraph1').innerHTML = territoryInfo.paragraph1;
document.getElementById('paragraph2').innerHTML = territoryInfo.paragraph2;

// Update video frame source
if (territoryInfo.videoUrl) {
    document.getElementById('video-frame').src = territoryInfo.videoUrl;
    document.getElementById('video-frame').style.display = 'block'; // Show video frame
} else {
    // Hide video frame if no video URL is provided
    document.getElementById('video-frame').style.display = 'none';
}

// Update popup image
document.getElementById('additional-image').onclick = territory === 'mayores' || territory === 'voluntariado' ? null : openPopup;

// Add 'selected' class to the "mayores" button if it's the initial load and viewport width is greater than 520 pixels
if (initialLoad && window.innerWidth > 520 && territory === 'mayores') {
    document.querySelector('button[data-territory="mayores"]').classList.add('selected');
}
}

document.addEventListener("DOMContentLoaded", function() {
// Select the 'mayores' button by default
document.querySelector('button[data-territory="mayores"]').classList.add('selected');

// Trigger click event on 'mayores' button
document.querySelector('button[data-territory="mayores"]').click();

// Add event listeners to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const territory = this.getAttribute('data-territory');
        changeContent(territory);

        // Remove 'selected' class from all buttons and add it only to the clicked one
        document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
    });
});

// Call changeContent with initialLoad set to true for the 'mayores' button
changeContent('mayores', true);
});
