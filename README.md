Căutarea imaginilor:

Proiectul este construit cu ajutorul parcel-project-template.
Pentru cererile HTTP este folosită librăria axios.
Este folosită sintaxa async/await.
Pentru notificări este folosită librăria notiflix.
Codul este formatat de Prettier.

Creați partea de front-end a unei aplicații care va căuta și vizualizați imaginile după un cuvânt cheie. Adăugați stiluri pentru elementele din interfață. Urmăriți filmulețul demonstrativ al aplicației.

Formularul de căutare:
Inițial, formularul se află în documentul HTML. Utilizatorul va introduce un text în câmpul de căutare, iar la trimiterea formularului, se va executa o solicitare HTTP.

<form class="search-form" id="search-form">
  <input
    type="text"
    name="searchQuery"
    autocomplete="off"
    placeholder="Search images..."
  />
  <button type="submit">Search</button>
</form>

HTTP requests:
Folosiți API-ul public de la Pixabay în calitate de back-end. Înregistrați-vă, obțineți o cheie unică de acces și citiți documentația.

Lista parametrilor de interogare pe care trebuie să îi specificați sunt:

key - cheia dvs. unică de acces la API.
q - valoarea pe care o va introduce utilizatorul.
image_type - tipul imaginii. Avem nevoie doar de fotografii, așa că setați valoarea photo.
orientation - orientarea fotografiei. Setați valoarea horizontal.
safesearch - se filtrează după vârstă. Setați valoarea true.
Răspunsul va conține o matrice de imagini care îndeplinesc criteriile parametrilor de interogare. Fiecare imagine este descrisă de un obiect, din care avem nevoie doar de următoarele proprietăți:

webformatURL - un link către imaginea mică.
largeImageURL - un link către imaginea mare.
tags - un text care descrie imaginea, potrivit pentru atribut alt.
likes - numărul de like-uri.
views - numărul de vizualizări.
comments - numărul de comentarii.
downloads - numărul de descărcări.
Dacă backend-ul returnează o matrice goală, înseamnă că nu a fost găsit nimic. În acest caz, afișează o notificare cu textul: "Sorry, there are no images matching your search query. Please try again.". Pentru notificări folosiți librăria notiflix.

Galerie și carduri de imagini:
Există deja elementul div.gallery în documentul HTML unde trebuie să introducem marcajul cardurilor de imagini. Când se caută un nou cuvânt cheie, trebuie să ștergeți complet conținutul galeriei pentru a nu amesteca rezultatele.

<div class="gallery">
  <!--Carduri cu imagini -->
</div>

Mai jos este specificat un șablon de card cu o singură imagine pentru o galerie.

<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>

Paginarea:
Pixabay API acceptă paginarea și oferă suport prin parametri page și per_page. Faceți astfel încât să apară 40 de obiecte în fiecare răspuns (20 este implicit).

Inițial, valoarea parametrului page trebuie să fie 1.
Cu fiecare cerere ulterioară, aceasta trebuie mărită cu 1.
La căutarea unui nou cuvânt cheie, valoarea page trebuie să fie returnată la valoarea inițială, deoarece se va implementa paginarea pentru colecția nouă de imagini.
Documentul HTML are deja elementul butonului. Atunci când se dă click, este necesar să se execute o solicitare pentru următorul grup de imagini și să adăugați un card de imagine la elementele galeriei deja existente.

<button type="button" class="load-more">Load more</button>

Inițial, butonul trebuie ascuns.
După prima solicitare, butonul apare în interfață, sub galerie.
Când formularul este retrimis, butonul este mai întâi ascuns, iar după solicitare este din nou afișat.
În răspunsul din back-end, se returnează proprietatea totalHits - numărul total de imagini care corespund criteriilor de căutare (pentru un cont gratuit). Dacă utilizatorul a ajuns la sfârșitul colecției, ascundeți butonul și afișați o notificare cu textul: "We're sorry, but you've reached the end of search results.".

Suplimentar:
ATENȚIE
Această funcționalitate nu este necesară la trimiterea acestui task, dar va fi un exercițiu suplimentar destul de bun.

Notificarea
După prima solicitare, pentru fiecare nouă căutare, se va afișa o notificare în care se va scrie câte imagini au fost găsite în total (proprietatea totalHits). Textul notificării va fi: "Hooray! We found totalHits images."

Librăria SimpleLightbox
Adăugați posibilitatea de afișare a unei versiuni mari a imaginei cu ajutorul librăriei SimpleLightbox pentru a simula funcționalitatea unei galerii complete.

În marcaj, va fi necesar să împachetați fiecare card de imagine într-un link, așa cum este indicat în documentație.
Librăria are o metodă refresh(), care trebuie apelată de fiecare dată după adăugarea unui nou grup de carduri cu imagini.
Pentru a conecta codul CSS al librăriei la proiect, trebuie să adăugați încă un import pe lângă cel descris în documentație.

// Descris în documentație
import SimpleLightbox from "simplelightbox";
// Import suplimentar de stil
import "simplelightbox/dist/simple-lightbox.min.css";

Derularea paginii:
Implementați un scroll fluid al paginii după solicitare și redarea fiecărui grup următor de imagini. Iată un cod-indiciu, dar încercați să-l înțelegeți de sine stătător.

const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

Infinite scrolling:
În locul butonului "Load more", se poate face o încărcare nesfârșită a imaginilor atunci când se derulează pagina. Aveți totală libertate în implementare, puteți folosi orice librărie doriți.