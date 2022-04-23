// get every seats in the movie room
var seatList = document.getElementsByClassName('seat');
var optionMenu = document.getElementById('movie');
let seatAvailable = document.getElementById('available-no');
let seatOccupied = document.getElementById('occupied-no');
let seatSelected= document.getElementById('selected-no');
let rightWing = document.getElementsByClassName('wing-right');
let leftWing= document.getElementsByClassName('wing-left');


function addWings(){

}

// let bookedSeatsList = ['B1', 'B3', 'C2', 'C7', 'D6', 'E3'];

let totalSeat = seatList.length - 3;
let selectedSeats = [];
let bookedSeatsList = [];
let bookedSeatNo = 0;
let availableSeatNo = 0;
let selectedSeatCount = 0;

// this function runs the whole program
function main(){

    bookedSeatsList =  randomBookedSeats(seatList);
    bookedSeatNo = bookedSeatsList.length;
    availableSeatNo =getAvailableSeatNo(totalSeat, bookedSeatNo);
    // disable the booked seats
    disableBookedSeats(bookedSeatsList);


    // update the booked seats msg
    updateSeatsNo(seatOccupied, bookedSeatNo);


    // update the available seats mgs
    updateSeatsNo(seatAvailable, availableSeatNo);


    // find the movie related details
    findMovieDetails(selectedSeatCount );
}
// event listeners
optionMenu.addEventListener('change', resetOnOptionChange);
addEventHandlers();

main();

// add image
function addImageSource(movieName){
    moviePath1 = "./img/avenger_poster.jpeg";
    moviePath2 = "./img/how_to_train_your_dragon_poster.jpg";
    moviePath3 = "./img/hulk_poster.jpg";
    moviePath4 = "./img/death_note_poster.jpg";
    let imgContainer = document.getElementsByClassName('poster');

    if(movieName == 'Avengers'){
        imgContainer[0].src = moviePath1;
        imgContainer[1].src = moviePath1;
    }
    else if (movieName == 'How to Train your Dragon?'){
        imgContainer[0].src = moviePath2;
        imgContainer[1].src = moviePath2;
    }
    else if (movieName == 'Hulk'){
        imgContainer[0].src = moviePath3;
        imgContainer[1].src = moviePath3;
    }
    else{

        imgContainer[0].src = moviePath4;
        imgContainer[1].src = moviePath4;
    }

}

function addEventHandlers(){

    for (let i = 0; i < seatList.length; i++) {
        // add the event listner

        seatList[i].addEventListener('click', () =>{
            if(!seatList[i].classList.contains('btn-occupied')){

                seatList[i].classList.toggle('btn-active');
                if(seatList[i].classList.contains('btn-active')){
                    // count the seats and update the selected seats json
                    selectedSeats.push(seatList[i].id);
                    selectedSeatCount += 1;

                    // update the selected seats no
                    updateSeatsNo(seatSelected, selectedSeatCount);
                    // indicate the no of selected seats
                    updatePartialAvailableSeat(availableSeatNo, selectedSeatCount);
                    // find the movie details and update the field at the bottom
                    findMovieDetails();

                    console.log("Selected Seats : ", selectedSeats,"Selected Count : ", selectedSeatCount);
                }
                else{
                    // user unselected the seat so pop the seat that was selected
                    seatIndex = selectedSeats.indexOf(seatList[i].id);
                    removed = selectedSeats.splice(seatIndex, 1);
                    console.log("seatIndex ", seatIndex);
                    selectedSeatCount -= 1;

                    // update the selected seats no
                    updateSeatsNo(seatSelected, selectedSeatCount);
                    // indicate the no of selected seats
                    updatePartialAvailableSeat(availableSeatNo, selectedSeatCount);

                    // find the movie details and update the field at the bottom
                    findMovieDetails();

                    console.log("Selected Seats : ", selectedSeats,"Selected Count : ", selectedSeatCount);
                }
            }
        })
    }
}


// disable the seats that are already booked
function disableBookedSeats(){
    let btnDisabledClass = 'btn-occupied';
    let btnActiveClass = 'btn-active';
    let tempSeat = seatList[i];
    // from the list of seats disable find the booked one
    for (i=3; i< seatList.length; i++)
    {
        if(seatList[i].classList.contains(btnDisabledClass))
        {
            console.log("contains disabled class?", seatList[i].classList.contains(btnDisabledClass));
            if(!bookedSeatsList.includes(seatList[i].id))
            {
                // this id should not be disabled
                seatList[i].classList.toggle(btnDisabledClass);
            }
        }else{
            if(bookedSeatsList.includes(seatList[i].id))
            {
                // this id should not be disabled
                seatList[i].classList.toggle(btnDisabledClass);
            }
        }

        // reset the selected seats
        if(seatList[i].classList.contains(btnActiveClass)){
            seatList[i].classList.toggle(btnActiveClass);
        }
    }

}


// show how many seats are aparently available
function updatePartialAvailableSeat(availableSeatNo, selectedSeatNo){

    console.log("Selected seat no  : ", selectedSeatNo);
    console.log("Available seat no : ", availableSeatNo);
    partialAvailableSeatNo = availableSeatNo - selectedSeatNo;
    document.getElementById('sel-msg').innerText = `- (${selectedSeatNo})`;
    document.getElementById('total-available-no').innerText = ` = ${partialAvailableSeatNo}`;

    // if nothing is selected show nothing...
    if(selectedSeatNo == 0){
        document.getElementById('sel-msg').innerText = '';
        document.getElementById('total-available-no').innerText = '';
    }
}


// randomly generate the booked seats for trial
function randomBookedSeats(){
    bookedSeats = []
    console.log("Generating random booked seats...");
    // generate random number in range 1 - 10
    bookedSeatsNo = Math.floor((Math.random() * 10) + 1);


    // randomly select seats that are booked
    i = 0;
    while( i < bookedSeatsNo)
    {
        rand_index = Math.floor((Math.random() * totalSeat) + 1);

        // console.log("random Index = ", rand_index, "Corresponding value : ", seatList[rand_index].id);
        seatId = seatList[rand_index].id;

        has_info_buttons = (seatId == 'selected' || seatId == 'occupied' || seatId == 'available')
        has_given_id = (bookedSeats.includes(seatList[rand_index].id))

        // if(has_info_buttons){
        //     // don't include this
        //     console.log("found those three",bookedSeats, i);
        //     continue;
        // }
        if(!has_given_id && !has_info_buttons)
        {
            // if the id is not present then push to the list otherwise don't
            bookedSeats.push(seatList[rand_index].id);
            // console.log("Found random id at : ", i, "bookedSeats: ",bookedSeats);
            i++;
        }

    }

    console.log("Total Booked Seats  : ", bookedSeatsNo);
    console.log("Random Booked Seats : ", bookedSeats);
    return bookedSeats;
}

function resetOnOptionChange(){
    // reset values to default

    selectedSeats = [];
    bookedSeatsList = randomBookedSeats(seatList);
    bookedSeatNo = bookedSeatsList.length;
    availableSeatNo = getAvailableSeatNo(totalSeat, bookedSeatNo);
    selectedSeatCount = 0;

    main();

    // update available seats to default
    updatePartialAvailableSeat(availableSeatNo, selectedSeatCount);





}


// find the movie name and its details
function findMovieDetails(){
    let option = document.getElementById('movie');
    let movieName = option[option.selectedIndex].innerText;

    movieName = movieName.slice(0, movieName.length-6);
    moviePrice = option[option.selectedIndex].value;

    // add the poster
    addImageSource(movieName);


    // find the lower table containing the last information
    let movieNameField = document.getElementById('movie-name');
    let moviePriceField = document.getElementById('per-unit-price');
    let totalPrice = document.getElementById('total-price');

    // update these fields
    movieNameField.innerText = movieName;
    moviePriceField.innerText =`$${moviePrice}`
    totalPrice.innerText = `$${selectedSeatCount * moviePrice}`;

    // update the selected msg
    seatSelected.innerText = selectedSeatCount;

    console.log("");
    console.log("Movie Selected : $", movieName);
    console.log("Movie Price    : $", moviePrice);
    console.log("Total Cost     : $", selectedSeatCount * moviePrice);
    console.log("");
}

function updateSeatsNo(seatType, seatNo){
    seatType.innerText = seatNo;
}

function getSelectedSeatNo(selectedSeats){
    return selectedSeats.length;
}

function getBookedSeatNo(bookedSeatsList){
    bookedSeatNo = bookedSeatsList.length;
    return bookedSeatNo;
}

function getAvailableSeatNo(totalSeat, bookedSeatNo){

    return totalSeat - bookedSeatNo;
}

