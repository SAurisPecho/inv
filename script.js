// PORTADA SOBRE
document.getElementById('abrirInvitacion').addEventListener('click', function() {
    document.getElementById('portada').classList.add('portada-abierta');
    setTimeout(() => {
      document.getElementById('portada').style.display = 'none';
      document.getElementById('contenido').style.display = 'block';
      document.getElementById('music-btn').style.display = 'flex';
      playMusic();
    }, 1000);
  });
  
  // MÚSICA DE FONDO Y BOTÓN
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  const audio = document.getElementById('bg-music');
  let musicPlaying = false;
  
  function setMusicIcon(playing) {
    if (playing) {
      musicIcon.innerHTML = `
        <span class="pause-lines">
          <span></span><span></span>
        </span>
      `;
      musicBtn.classList.add('music-active');
    } else {
      musicIcon.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 28 28">
          <polygon points="7,5 23,14 7,23" fill="#888"/>
        </svg>
      `;
      musicBtn.classList.remove('music-active');
    }
  }
  function playMusic() {
    audio.play();
    musicPlaying = true;
    setMusicIcon(true);
  }
  function pauseMusic() {
    audio.pause();
    musicPlaying = false;
    setMusicIcon(false);
  }
  musicBtn.addEventListener('click', function(){
    if(musicPlaying){
      pauseMusic();
    }else{
      playMusic();
    }
  });
  audio.addEventListener('ended', () => {
    pauseMusic();
  });
  
  window.addEventListener('touchstart',()=>{ if(musicPlaying && audio.paused) audio.play(); }, {once:true});
  setMusicIcon(false);
  
  // CUENTA REGRESIVA
  function updateCountdown() {
    const dateTarget = new Date("2025-08-30T18:30:00-05:00");
    const now = new Date();
    let diff = dateTarget - now;
    if(diff < 0) diff = 0;
    const dias = Math.floor(diff/(1000*60*60*24));
    const horas = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const min = Math.floor((diff%(1000*60*60))/(1000*60));
    const seg = Math.floor((diff%(1000*60))/1000);
    document.getElementById('dias').textContent = dias.toString().padStart(2,'0');
    document.getElementById('horas').textContent = horas.toString().padStart(2,'0');
    document.getElementById('min').textContent = min.toString().padStart(2,'0');
    document.getElementById('seg').textContent = seg.toString().padStart(2,'0');
  }
  setInterval(updateCountdown,1000); updateCountdown();
  
  // PADRINOS CARRUSEL
  const padrinos = [
    { icon:"img/iglesia.svg", tipo:"De Boda", nombres:["Ana María Sánchez","Sebastián Torres Herrera"] },
    { icon:"img/lazo.svg", tipo:"Lazo", nombres:["Carolina Castro Silva","Javier Medina Rojas"] },
    { icon:"img/anillos.svg", tipo:"Anillos", nombres:["Sofía García Ramírez","Diego González Jiménez"] },
  ];
  let padrinoIndex=0;
  function renderPadrinoSlide() {
    const wrap=document.getElementById('padrinoSlideWrap');
    wrap.innerHTML='';
    padrinos.forEach((pad,i)=>{
      const div=document.createElement('div');
      div.className='padrino-slide'+(i===padrinoIndex?' active':'');
      div.innerHTML=`
        <img src="${pad.icon}" alt="${pad.tipo}" class="padrino-icon">
        <div class="padrino-tipo">${pad.tipo}</div>
        <div class="padrino-nombres">${pad.nombres.join('<br>')}</div>
      `;
      wrap.appendChild(div);
    });
    renderPadrinoDots();
  }
  function renderPadrinoDots() {
    const dots=document.getElementById('padrinoDots');
    dots.innerHTML='';
    padrinos.forEach((_,i)=>{
      const dot=document.createElement('span');
      dot.className='padrino-dot'+(i===padrinoIndex?' active':'');
      dot.onclick=()=>{padrinoIndex=i;renderPadrinoSlide();}
      dots.appendChild(dot);
    });
  }
  document.getElementById('padrinoPrev').onclick=()=>{
    padrinoIndex=(padrinoIndex-1+padrinos.length)%padrinos.length;renderPadrinoSlide();
  };
  document.getElementById('padrinoNext').onclick=()=>{
    padrinoIndex=(padrinoIndex+1)%padrinos.length;renderPadrinoSlide();
  };
  renderPadrinoSlide();
  
  // ITINERARIO EFECTO LÍNEA
  const timelineEvents = [
    { num: "01", label: "Iglesia", hora: "6:30 PM", img: "img/iglesia.svg", lado: "izq" },
    { num: "02", label: "Recepción", hora: "8:00 PM", img: "img/recepcion.svg", lado: "der" },
    { num: "03", label: "Brindis", hora: "8:30 PM", img: "img/brindis.svg", lado: "izq" },
    { num: "04", label: "Cena", hora: "9:00 PM", img: "img/cena.svg", lado: "der" },
    { num: "05", label: "Baile", hora: "10:00 PM", img: "img/baile.svg", lado: "izq" }
  ];
  function renderTimeline() {
    const cont = document.getElementById('timeline');
    cont.innerHTML = `
      <div class="timeline-base"></div>
      <div class="timeline-reveal" id="timelineReveal"></div>
    `;
    timelineEvents.forEach((evt, i) => {
      const div = document.createElement('div');
      div.className = `timeline-event ${evt.lado}`;
      div.id = `timeline-event-${i}`;
      div.innerHTML = `
        <div class="timeline-block">
          <img src="${evt.img}" alt="${evt.label}">
        </div>
        <div class="timeline-circle">${evt.num}</div>
        <div class="timeline-label">${evt.label}</div>
        <div class="timeline-hora">${evt.hora}</div>
      `;
      cont.appendChild(div);
    });
  }
  renderTimeline();
  
  function updateTimelineReveal() {
    const timeline = document.getElementById('timeline');
    const reveal = document.getElementById('timelineReveal');
    const rect = timeline.getBoundingClientRect();
    const timelineTop = rect.top + window.scrollY;
    const timelineHeight = rect.height;
  
    const scrollY = window.scrollY + window.innerHeight / 3;
    let revealed = (scrollY - timelineTop) / (timelineHeight / 3);
    revealed = Math.max(0, Math.min(1, revealed));
  
    reveal.style.height = (revealed * 100) + '%';
  }
  window.addEventListener('scroll', updateTimelineReveal);
  window.addEventListener('resize', updateTimelineReveal);
  setTimeout(updateTimelineReveal, 80);
  // NUESTRA HISTORIA CARRUSEL
  const historiaSlides = [
    { img:'img/hist1.jpg', text:'Todo comenzó con una mirada En medio de una multitud, nuestras miradas se cruzaron por primera vez. En ese instante, sentimos una conexión que lo cambió todo, como si el mundo se detuviera solo para nosotros.' },
    { img:'img/hist2.jpg', text:'Un encuentro que lo cambió todo Lo que comenzó como un simple encuentro, rápidamente se transformó en una promesa de amor. Así empezó nuestra hermosa historia, que sigue creciendo cada día.' },
    { img:'img/hist3.jpg', text:'El destino nos unió Sin buscarlo, el destino nos puso en el mismo lugar. Una charla casual se convirtió en algo más, y sin darnos cuenta, nuestras vidas empezaron a entrelazarse.' },
    { img:'img/hist4.jpg', text:'Escrito en las estrellas Desde el principio, sentimos que nuestra historia ya estaba escrita. Cada momento juntos confirmaba que estábamos destinados a encontrarnos.' }
  ];
  let historiaIndex=0;
  function renderHistoriaSlide() {
    const slide = document.getElementById('historiaSlide');
    slide.innerHTML = `
      <img src="${historiaSlides[historiaIndex].img}" alt="Historia" class="historia-img">
      <div class="historia-text">${historiaSlides[historiaIndex].text}</div>
    `;
    renderHistoriaDots();
  }
  function renderHistoriaDots() {
    const dots = document.getElementById('historiaDots');
    dots.innerHTML = '';
    historiaSlides.forEach((_,i)=>{
      const dot=document.createElement('span');
      dot.className='historia-dot'+(i===historiaIndex?' active':'');
      dot.onclick=()=>{historiaIndex=i;renderHistoriaSlide();}
      dots.appendChild(dot);
    });
  }
  document.getElementById('historiaPrev').onclick=()=>{
    historiaIndex=(historiaIndex-1+historiaSlides.length)%historiaSlides.length;
    renderHistoriaSlide();
  };
  document.getElementById('historiaNext').onclick=()=>{
    historiaIndex=(historiaIndex+1)%historiaSlides.length;
    renderHistoriaSlide();
  };
  renderHistoriaSlide();
  
  // ANIMACIONES NOVIO/NOVIA
  function showParejaBlocks() {
    document.querySelectorAll('.pareja-img').forEach((img,i)=>{
      setTimeout(()=>img.classList.add('visible'),300+i*400);
    });
    document.querySelectorAll('.pareja-text').forEach((txt,i)=>{
      setTimeout(()=>txt.classList.add('visible'),900+i*400);
    });
  }
  window.addEventListener('scroll',()=> {
    const pareja = document.querySelector('.historia-pareja');
    if(pareja && pareja.getBoundingClientRect().top < window.innerHeight-80) showParejaBlocks();
  });
  
  // DÍA QUE CAMBIÓ TODO GALERÍA
  document.querySelectorAll('.dia-cambio-galeria .gal-img').forEach(img=>{
    img.addEventListener('mouseenter',function(){
      document.querySelectorAll('.dia-cambio-galeria .gal-img').forEach(i=>i.classList.remove('active'));
      img.classList.add('active');
    });
    img.addEventListener('mouseleave',function(){
      img.classList.remove('active');
    });
    img.addEventListener('touchstart',function(){
      document.querySelectorAll('.dia-cambio-galeria .gal-img').forEach(i=>i.classList.remove('active'));
      img.classList.add('active');
    });
  });
  
  // GALERÍA FINAL DIVIDIDA
  const galeriaFotos = [
    'assets/gal.jpg',
    'assets/gal.jpg',
    'assets/gal.jpg',
    'assets/gal.jpg'
  ];
  let galeriaIndex=0;
  function renderGaleriaDividida() {
    const cont = document.getElementById('galeriaDividida');
    cont.innerHTML = '';
    for(let i=0;i<6;i++) {
      const div = document.createElement('div');
      div.className='gal-div';
      div.style.backgroundImage=`url('${galeriaFotos[galeriaIndex]}')`;
      div.innerHTML = `<img src="${galeriaFotos[galeriaIndex]}" alt="Galería" style="left:-${i*100/6}%;">`;
      div.onmouseenter = ()=> {
        document.querySelectorAll('.gal-div').forEach(d=>d.classList.remove('expand','shrink'));
        div.classList.add('shrink');
        for(let j=0;j<6;j++) if(j!==i) cont.children[j].classList.add('shrink');
      };
      div.onclick = ()=>{
        galeriaIndex=(galeriaIndex+1)%galeriaFotos.length;
        renderGaleriaDividida();
      };
      div.onmouseleave = ()=>{
        document.querySelectorAll('.gal-div').forEach(d=>d.classList.remove('expand','shrink'));
      };
      cont.appendChild(div);
    }
  }
  renderGaleriaDividida();