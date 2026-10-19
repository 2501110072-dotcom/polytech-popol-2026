// 학생 15명 데이터베이스
const students = [
  { id: 1, name: "석고상 학생 01", desc: "50~100자 자기소개 텍스트 자리. 공간과 입체의 경계를 탐구하며 제작된 석고상 작품입니다." },
  { id: 2, name: "석고상 학생 02", desc: "50~100자 자기소개 텍스트 자리. 명암과 볼륨감을 극대화하여 조형적 아름다움을 표현했습니다." },
  { id: 3, name: "석고상 학생 03", desc: "50~100자 자기소개 텍스트 자리. 전통 조각 기법을 현대적 시선으로 재해석한 시도입니다." },
  { id: 4, name: "석고상 학생 04", desc: "50~100자 자기소개 텍스트 자리. 각도에 따라 달라지는 빛과 그림자의 리듬에 집중했습니다." },
  { id: 5, name: "석고상 학생 05", desc: "50~100자 자기소개 텍스트 자리. 질감의 극명한 대비를 통해 내면의 정서를 담아냈습니다." },
  { id: 6, name: "석고상 학생 06", desc: "50~100자 자기소개 텍스트 자리. 곡선의 유연함 속에서 느껴지는 묵직한 중량감을 다룹니다." },
  { id: 7, name: "석고상 학생 07", desc: "50~100자 자기소개 텍스트 자리. 건축적 투시 구도와 자연스러운 수직적 비례를 결합했습니다." },
  { id: 8, name: "석고상 학생 08", desc: "50~100자 자기소개 텍스트 자리. 절제된 형태미 속에서 느껴지는 강렬한 시각적 존재감입니다." },
  { id: 9, name: "석고상 학생 09", desc: "50~100자 자기소개 텍스트 자리. 빛의 변화에 대응하는 양감의 움직임을 관찰하고 제작했습니다." },
  { id: 10, name: "석고상 학생 10", desc: "50~100자 자기소개 텍스트 자리. 원근감에 따른 시선 이동과 조각 표면의 질감을 조화시켰습니다." },
  { id: 11, name: "석고상 학생 11", desc: "50~100자 자기소개 텍스트 자리. 프레임 너머의 자유로운 여백을 채우는 조각적 모험입니다." },
  { id: 12, name: "석고상 학생 12", desc: "50~100자 자기소개 텍스트 자리. 입체 형태가 전달하는 묵묵한 서사와 유기적 형태 표현입니다." },
  { id: 13, name: "석고상 학생 13", desc: "50~100자 자기소개 텍스트 자리. 높은 고저차의 중심에서 시선을 사로잡는 대형 조형 작품입니다." },
  { id: 14, name: "석고상 학생 14", desc: "50~100자 자기소개 텍스트 자리. 투시선 흐름에 맞춰 곡면 질감을 부드럽게 강조했습니다." },
  { id: 15, name: "석고상 학생 15", desc: "50~100자 자기소개 텍스트 자리. 전시 공간의 끝을 장식하는 입체적 감성의 석고상입니다." }
];

let currentIndex = 0;
let currentRoom = 0;

// DOM 엘리먼트
const introPage = document.getElementById('intro-page');
const transitionPage = document.getElementById('transition-page');
const galleryPage = document.getElementById('gallery-page');
const listPage = document.getElementById('list-page');
const panorama = document.getElementById('panorama');
const stage = document.getElementById('stage');

// 디테일 엘리먼트
const detailView = document.getElementById('detail-view');
const detailSculpture = document.getElementById('detail-sculpture');
const detailName = document.getElementById('detail-name');
const detailDesc = document.getElementById('detail-desc');

// 1. 입장
document.getElementById('enter')?.addEventListener('click', () => {
  introPage.classList.remove('active');
  transitionPage.classList.add('active');
  
  setTimeout(() => transitionPage.classList.add('opening'), 200);
  setTimeout(() => {
    transitionPage.classList.remove('active', 'opening');
    galleryPage.classList.add('active');
    updateNavPill(0);
  }, 1400);
});

// 2. 상단 버튼 네비게이션
document.querySelectorAll('.pill-nav button').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const page = e.target.dataset.page;
    const room = e.target.dataset.room;

    if (page === 'intro') {
      galleryPage.classList.remove('active');
      listPage.classList.remove('active');
      introPage.classList.add('active');
    } else if (page === 'list') {
      galleryPage.classList.remove('active');
      introPage.classList.remove('active');
      listPage.classList.add('active');
      renderStudentList();
    } else if (room !== undefined) {
      listPage.classList.remove('active');
      introPage.classList.remove('active');
      galleryPage.classList.add('active');
      switchRoom(parseInt(room));
    }
  });
});

function updateNavPill(roomIndex) {
  document.querySelectorAll('.pill-nav button').forEach(b => {
    b.classList.remove('active');
    if (b.dataset.room === String(roomIndex)) {
      b.classList.add('active');
    }
  });
  const titles = ["GALLERY 01", "GALLERY 02", "GALLERY 03"];
  const titleEl = document.getElementById('title');
  if (titleEl) titleEl.innerText = titles[roomIndex] || "GALLERY 01";
}

function switchRoom(index) {
  if (index < 0) index = 0;
  if (index > 2) index = 2;
  currentRoom = index;
  panorama.classList.remove('dragging');
  panorama.style.transform = `translateX(-${index * 33.333333}%)`;
  updateNavPill(index);
}

document.getElementById('back')?.addEventListener('click', () => switchRoom(currentRoom - 1));
document.getElementById('forward')?.addEventListener('click', () => switchRoom(currentRoom + 1));

// 3. 부드러운 마우스 드래그 & 스위프 (이동 복구)
let isDragging = false;
let startX = 0;
let dragDiff = 0;

if (stage) {
  stage.addEventListener('mousedown', (e) => {
    if (detailView && detailView.classList.contains('active')) return;
    isDragging = true;
    startX = e.clientX;
    dragDiff = 0;
    panorama.classList.add('dragging');
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    dragDiff = e.clientX - startX;
    
    // 이송 도중 관성 연출
    const currentPercent = -currentRoom * 33.333333;
    const offsetPercent = (dragDiff / stage.clientWidth) * 33.333333;
    panorama.style.transform = `translateX(${currentPercent + offsetPercent}%)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    panorama.classList.remove('dragging');

    if (dragDiff < -60 && currentRoom < 2) {
      switchRoom(currentRoom + 1);
    } else if (dragDiff > 60 && currentRoom > 0) {
      switchRoom(currentRoom - 1);
    } else {
      switchRoom(currentRoom); // 원래 위치 복귀
    }
    dragDiff = 0;
  });

  // Touch Support
  stage.addEventListener('touchstart', (e) => {
    if (detailView && detailView.classList.contains('active')) return;
    startX = e.touches[0].clientX;
    dragDiff = 0;
    panorama.classList.add('dragging');
  });

  stage.addEventListener('touchmove', (e) => {
    if (!startX) return;
    dragDiff = e.touches[0].clientX - startX;
    const currentPercent = -currentRoom * 33.333333;
    const offsetPercent = (dragDiff / stage.clientWidth) * 33.333333;
    panorama.style.transform = `translateX(${currentPercent + offsetPercent}%)`;
  });

  stage.addEventListener('touchend', () => {
    panorama.classList.remove('dragging');
    if (dragDiff < -50 && currentRoom < 2) {
      switchRoom(currentRoom + 1);
    } else if (dragDiff > 50 && currentRoom > 0) {
      switchRoom(currentRoom - 1);
    } else {
      switchRoom(currentRoom);
    }
    dragDiff = 0;
  });
}

// 4. 클릭 시 팝업 뷰어
window.openDetail = function(id) {
  currentIndex = id - 1;
  const data = students[currentIndex] || { name: `석고상 학생 ${id}`, desc: "50~100자 자기소개 텍스트 자리입니다." };

  if (detailName) detailName.innerText = data.name;
  if (detailDesc) detailDesc.innerText = data.desc;
  if (detailSculpture) detailSculpture.innerText = data.name;

  if (detailView) detailView.classList.add('active');
};

function closeDetail() {
  if (detailView) detailView.classList.remove('active');
}

document.getElementById('detail-close')?.addEventListener('click', closeDetail);
document.getElementById('nav-prev')?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + students.length) % students.length;
  window.openDetail(currentIndex + 1);
});
document.getElementById('nav-next')?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % students.length;
  window.openDetail(currentIndex + 1);
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDetail();
});

// 5. LIST 페이지 렌더링
function renderStudentList() {
  const grid = document.getElementById('student-grid');
  if (!grid) return;
  grid.innerHTML = students.map(s => `
    <div class="student-card" onclick="openDetailFromList(${s.id})">
      <b>${s.name}</b>
      <small>VIEW PROFILE ↗</small>
    </div>
  `).join('');
}

window.openDetailFromList = function(id) {
  listPage.classList.remove('active');
  galleryPage.classList.add('active');
  window.openDetail(id);
};
