// Одной из особенностей многопоточных языков является возможность
// выпололнять процедуры одновременно, в разных потоках, используя разные процессоры или даже компьютеры, 
// однако в то же время, такие потоки могут "share memoery" для одного и того же процесса. 

// JavaScript однопоточен и механизм EventLoop выполняет одну процедуру за другой.
// Такие процедуры не могу прерывать выполнения друг друга, и не могут прервать поток выполнения.
// Так же очевидно, что ничего связнного с "share memoery" между потоками в языке нет.

var a = 20;

function foo() {
    a = a + 1;
}

function bar() {
    a = a * 2;
}

ajax( "http://some.url.1", foo ); // *1
ajax( "http://some.url.2", bar ); // *2

// В зависимости от того, какая функция будет вызвана первой, результат предсказуем.
// В то же время, если бы язык распределял память между потоками, и задачи *1 и *2
// выполнялись одновременно, результаты могли бы быть совершенно непредсказуемыми.

// Многопоточное программирование может быть весьма коварным и непредсказуемым, 
// в ситуациях, когда для контроля памятью и обмена данными между потоками не были 
// предприняты определенные шаги.


// Выполнение когда на JavaScript происходит согласно правилу Run-to-Completion, 
// которое означает, что если стандатрная (не генератор) функция начинает выполнение, то весь ее код
// будет выполнен до того, как начнется выполнение когда в какой-либо другой функции.

// Из MDN:
// Each message is processed completely before any other message is processed.
// This offers some nice properties when reasoning about your program,
// including the fact that whenever a function runs, it cannot be pre-empted and
// will run entirely before any other code runs (and can modify data the function manipulates).
// This differs from C, for instance, where if a function runs in a thread,
// it may be stopped at any point by the runtime system to run some other code in another thread.

// A downside of this model is that if a message takes too long to complete,
// the web application is unable to process user interactions like click or scroll.
// The browser mitigates this with the "a script is taking too long to run" dialog.
// A good practice to follow is to make message processing short and
// if possible cut down one message into several messages.
