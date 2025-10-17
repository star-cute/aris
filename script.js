document.addEventListener("DOMContentLoaded", function() {
    // === Members Page ===
    const teamGrid = document.getElementById("teamGrid");
    const pagination = document.getElementById("pagination");
    const searchInput = document.getElementById("searchInput");

    if(teamGrid){
        const members = Array.from({length:60}, (_,i)=>({
            id:i+1,
            name:`عضو شماره ${i+1}`,
            role:"استاد علمی",
            bio:"توضیح کوتاه درباره عضو",
            img:`https://picsum.photos/seed/member${i+1}/200/200`
        }));

        let filtered = [...members];
        let currentPage = 1;
        const itemsPerPage = 20;

        function renderCards(list,page=1){
            teamGrid.innerHTML="";
            const start=(page-1)*itemsPerPage;
            const end=start+itemsPerPage;
            const slice=list.slice(start,end);

            slice.forEach(m=>{
                const card=document.createElement("div");
                card.className="card";
                card.innerHTML=`
                  <div class="card-front">
                      <img src="${m.img}" alt="${m.name}">
                      <div class="name">${m.name}</div>
                      <div class="role">${m.role}</div>
                  </div>
                  <div class="card-back">
                      <p class="bio">${m.bio}</p>
                      <button class="view-profile-btn">مشاهده پروفایل</button>
                  </div>
              `;
                teamGrid.appendChild(card);
                card.querySelector(".view-profile-btn").addEventListener("click", ()=>{
                    window.location.href = `profile.html?id=${m.id}`;
                });
            });
            renderPagination(list,page);
        }

        function renderPagination(list,page){
            pagination.innerHTML="";
            const totalPages=Math.ceil(list.length/itemsPerPage);

            const prevBtn=document.createElement("button");
            prevBtn.textContent="قبل";
            prevBtn.disabled=page===1;
            prevBtn.addEventListener("click",()=>{ if(page>1){ currentPage--; renderCards(filtered,currentPage); } });
            pagination.appendChild(prevBtn);

            for(let i=1;i<=totalPages;i++){
                const btn=document.createElement("button");
                btn.textContent=i;
                if(i===page) btn.classList.add("active");
                btn.addEventListener("click",()=>{ currentPage=i; renderCards(filtered,currentPage); });
                pagination.appendChild(btn);
            }

            const nextBtn=document.createElement("button");
            nextBtn.textContent="بعد";
            nextBtn.disabled=page===totalPages;
            nextBtn.addEventListener("click",()=>{ if(page<totalPages){ currentPage++; renderCards(filtered,currentPage); } });
            pagination.appendChild(nextBtn);
        }

        searchInput.addEventListener("input", function(){
            const query=this.value.toLowerCase();
            filtered=members.filter(m=>m.name.toLowerCase().includes(query));
            currentPage=1;
            renderCards(filtered,currentPage);
        });

        renderCards(filtered,currentPage);
    }

    // === Profile Page ===
    if(document.querySelector(".profile-pic")){
        const urlParams = new URLSearchParams(window.location.search);
        const memberId = parseInt(urlParams.get('id')) || 1;

        const members = Array.from({length:60}, (_,i)=>({
            id:i+1,
            name:`عضو شماره ${i+1}`,
            role:"Product Designer",
            bio:"توضیح کوتاه درباره عضو",
            img:`https://picsum.photos/seed/member${i+1}/200/200`,
            projects: Math.floor(Math.random()*20),
            theses: Math.floor(Math.random()*10),
            articles: Math.floor(Math.random()*30),
            conferences: Math.floor(Math.random()*40)
        }));

        const member = members.find(m=>m.id===memberId);

        if(member){
            document.querySelector(".profile-pic img").src = member.img;
            document.querySelector(".info h2").textContent = member.name;
            document.querySelector(".info p").textContent = member.role;

            const stats = document.querySelectorAll(".stat");
            stats[0].querySelector("h3").textContent = member.projects;
            stats[1].querySelector("h3").textContent = member.theses;
            stats[2].querySelector("h3").textContent = member.articles;
            stats[3].querySelector("h3").textContent = member.conferences;
        }

        const articleList = document.getElementById("articleList");
        if(articleList){
            const articles = Array.from({length:15}, (_,i)=>({
                title:`مقاله ${i+1} از ${member.name}`,
                content:`توضیح کوتاه درباره مقاله ${i+1}`
            }));
            articles.forEach(a=>{
                const div=document.createElement("div");
                div.className="article";
                div.innerHTML=`<h3>${a.title}</h3><p>${a.content}</p>`;
                articleList.appendChild(div);
            });

            const searchInputProfile = document.getElementById("searchInput");
            searchInputProfile.addEventListener("input", function(){
                const filter = this.value.toLowerCase();
                articles.forEach((a,i)=>{
                    const text = a.title.toLowerCase()+" "+a.content.toLowerCase();
                    const articleDiv = articleList.children[i];
                    articleDiv.style.display = text.includes(filter) ? "block" : "none";
                });
            });
        }
    }
});

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

function handleResize(){
    if(window.innerWidth <= 768){
        sidebar.classList.remove("desktop-open");
        sidebar.classList.add("mobile-closed");
    } else {
        sidebar.classList.remove("mobile-open","mobile-closed");
        sidebar.classList.add("desktop-open");
    }
}
handleResize();
window.addEventListener("resize", handleResize);

toggleBtn.addEventListener("click", ()=>{
    if(window.innerWidth <= 768){
        sidebar.classList.toggle("mobile-open");
        sidebar.classList.toggle("mobile-closed");
    }
});
