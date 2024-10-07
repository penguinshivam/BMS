// show book
export function showBook(index, books){
    const book = books[index] ;
    const main_container = document.querySelector("#main_container");
    main_container.classList.add("hidden");
    const showPage = document.querySelector("#showPage");
    showPage.classList.remove("hidden");    
    showPage.innerHTML ='';
    const bookItem = document.createElement('div');
        bookItem.classList.add('book-item', 'flex', 'justify-between', 'p-4', 'bg-white', 'rounded-lg', 'shadow', 'mb-4');
        bookItem.innerHTML = `
            <div class="flex flex-col items-start">
                <div>${book.getBookDetails()}</div>
                <div class="mt-4">
                    <button class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-2" onclick="backBtn()">Back</button>
                </div>
            </div>`;
        showPage.appendChild(bookItem);
}
