const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`);
    // console.log(...htmlElements);
    return(htmlElements.join(" "));
}

const manageSpinner = (status)=> {
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }else{
        document.getElementById('spinner').classList.add('hidden');
        document.getElementById('word-container').classList.remove('hidden');

    }
}

const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url) // promise of response
        .then((res) => res.json()) //promise of json
        .then((json) => displayLesson(json.data))
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn => {
        btn.classList.remove('active');
    })
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive(); //remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active"); // add active class
            displayLevelWord(data.data);
        })
};


// {
//     "word": "Tranquil",
//     "meaning": "শান্ত / নিরিবিলি",
//     "pronunciation": "ট্রাঙ্কুইল",
//     "level": 6,
//     "sentence": "The park was a tranquil place to relax.",
//     "points": 4,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "peaceful",
//         "calm",
//         "serene"
//     ],
//     "id": 20
// }
const loadWordDetail = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    console.log(url);
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}
const displayWordDetails = (word)=> {
    console.log(word);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
                <div class="">
                    <h2 class="text-2xl font-bold">
                        ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
                    </h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Synonym</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div>
    `;
    document.getElementById("word_modal").showModal();

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = '';
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full rounded py-10 space-y-6">
            <img class="mx-auto" src="../assets/alert-error.png"></img>
            <p class="text-xl font-medium text-gray-400 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    }

    //     {
    //     "id": 63,
    //     "level": 3,
    //     "word": "Meager",
    //     "meaning": "অত্যল্প / নগণ্য",
    //     "pronunciation": "মীগার"
    // }
    words.forEach(word => {
        // console.log(word)
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning/Pronunciation</p>
            <div class="text-2xl font-semibold font-bangla text-gray-700">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায় নি"} "</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF]/10 hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
        manageSpinner(false);
    })
}

const displayLesson = (lessons) => {
    // 1. get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for (let lesson of lessons) {

        //     3. create Element
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick=(loadLevelWord(${lesson.level_no})) class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
        //     4. Append into container
        levelContainer.append(btnDiv);

    }
}

loadLessons()