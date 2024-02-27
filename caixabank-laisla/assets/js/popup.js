var mainImageSources = {};
    var additionalImageSources = {};
    var videoSources = {};

    function openPopup() {
        document.getElementById('popup').style.display = 'flex';
    }

    function closePopup() {
        document.getElementById('popup').style.display = 'none';
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
							paragraph1: '· Una apuesta por las ideas de cambio que ayuden a mejorar la vida de las personas y favorezcan el desarrollo de las comunidades desatendidas a nivel local. <br><br>· Programas que cubren una gran variedad de necesidades de colectivos vulnerables.<br><br>· Formación que ayuda a superar limitaciones en entornos o momentos clave de la vida de las personas. <br><br>· Acompañamiento en sus distintas formas: compartir momentos con personas mayores para evitar la soledad no deseada, dar apoyo moral o impulsar la vida laboral.<br><br>',
							paragraph2: '· Activismo medioambiental para favorecer la conservación de los bosques, la limpieza de las playas o la protección de la biodiversidad. <br><br>· Iniciativas sociales locales que refuerzan la cercanía con el territorio. <br><br>· Emergencia humanitaria, dando respuesta rápida a situaciones que se producen de manera inesperada y requieren de una actuación inmediata, ya que afectan a un importante número de personas. <br><br>· Voluntariado corporativo con iniciativas como el #MesSocial.<br><br>'
						};
						break;
					case 'emprendimiento':
						territoryInfo = {
							mainImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/emprendimiento-mapa.svg',
							additionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/emprendimiento-img.png',
							mobileAdditionalImage: 'https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/emprendimiento-img-mobile.png',
							videoUrl: 'https://www.youtube.com/embed/hPMmauI-drw?si=aIyIc67-rTe0Hh8-',
							title: 'Emprendimiento',
							description: 'Donde los proyectos con impacto social se hacen realidad',
							listItems: ['<li><img src="assets/img/icon1.svg" alt="Small Image"><span>Se le conoce también como <a href="https://www.microbank.com/es/inicio.html" target="_blank" rel="nofollow"> MicroBank.</a></span></li>',
								'<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon2.svg" alt="Small Image"><span>Lo habitan los emprendedores gracias a los microcréditos.</span></li>',
								'<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon3.svg" alt="Small Image"><span>Se trata de un territorio donde se impulsa la financiación con impacto social.</span></li>',
								'<li><img src="https://brandedcontentgrupogodo.github.io/ext/caixabank-laisla/assets/img/icon4.svg" alt="Small Image"><span>Apoyo para quienes necesitan una primera oportunidad para poner en marcha su negocio. CaixaBank confía en los proyectos y por eso es el banco líder en microfinanzas en Europa, con más de 1.300MM€ de crédito concedido y 148.000 beneficiarios  en 2023. Esto lo hace posible la red de <strong>más de 3.600 oficinas de CaixaBank.</strong></span></li>'
							],
							paragraph1: '· Impacto social positivo con indicadores que permiten poner en valor de una manera robusta el efecto que esto genera. <br><br>· Creación de empleo con el apoyo a emprendedores. <br><br>· Una red de colaboración con entidades público-privadas de todo el territorio para fortalecer el tejido empresarial a través del apoyo a los emprendedores con recursos más limitados. <br><br>· Programas de garantía de la Comisión Europea a través del Fondo Europeo de Inversiones.<br><br>',
							paragraph2: '· Inclusión financiera de los colectivos que, sin estos microcréditos, tendrían dificultades para acceder al sistema financiero. <br><br>· Criterios ASG con foco en la S de social. <br><br>· Desarrollo personal y familiar al darse respuesta a las necesidades financieras de personas con ingresos moderados. <br><br>· Proyectos personales, que tienen detrás historias muy emotivas, que pueden ser explicados en primera persona.<br><br>'
						};
						break;
				}
		
				var mainImage = document.getElementById('main-image');
        mainImage.src = territoryInfo.mainImage;
        mainImageSources[territory] = territoryInfo.mainImage;

        var additionalImage = document.getElementById('additional-image');
        if (window.innerWidth <= 520 && territoryInfo.mobileAdditionalImage) {
            additionalImage.src = territoryInfo.mobileAdditionalImage;
            additionalImageSources[territory] = territoryInfo.mobileAdditionalImage;
        } else {
            additionalImage.src = territoryInfo.additionalImage;
            additionalImageSources[territory] = territoryInfo.additionalImage;
        }

        if (territoryInfo.videoUrl) {
            videoSources[territory] = territoryInfo.videoUrl;
        }

        // Only update content if initialLoad is true
        if (initialLoad) {
            document.getElementById('title').innerText = territoryInfo.title;
            document.getElementById('description').innerText = territoryInfo.description;

            if (territoryInfo.listItems) {
                const listItemsHTML = territoryInfo.listItems.join('');
                document.getElementById('list').innerHTML = listItemsHTML;
            }

            document.getElementById('paragraph1').innerHTML = territoryInfo.paragraph1;
            document.getElementById('paragraph2').innerHTML = territoryInfo.paragraph2;
        }

        var videoFrame = document.getElementById('video-frame');
        if (territoryInfo.videoUrl) {
            videoFrame.src = territoryInfo.videoUrl;
            videoFrame.style.display = 'block';
        } else {
            videoFrame.style.display = 'none';
        }

        document.getElementById('additional-image').onclick = territory === 'mayores' || territory === 'voluntariado' ? null : openPopup;

        if (initialLoad && window.innerWidth > 520 && territory === 'mayores') {
            document.querySelector('button[data-territory="mayores"]').classList.add('selected');
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        document.querySelector('button[data-territory="mayores"]').classList.add('selected');
        document.querySelector('button[data-territory="mayores"]').click();

        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const territory = this.getAttribute('data-territory');
                changeContent(territory, true); // Pass true for initialLoad
                document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        changeContent('mayores', true);
    });