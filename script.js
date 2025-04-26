// グローバル変数
let selectedCardId = null;
let winningCardId = null; // あたりのカードID

const flipSound = new Audio('sounds/flip.mp3');

// カードをクリックしたら
document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", function () {
        selectedCardId = this.id;
        winningCardId = decideWinningCard(); // ランダムにあたりカードを決める
        startReplacement(); // 差し替え開始
    });
});

// あたりカードをランダムに決める関数
function decideWinningCard() {
    const cards = Array.from(document.querySelectorAll(".card"));
    const randomIndex = Math.floor(Math.random() * cards.length);
    return cards[randomIndex].id; // ランダムに選んだカードのIDを返す
}

// 差し替えを順番に行う関数
function startReplacement() {
    if (selectedCardId === null) return;

    const cards = Array.from(document.querySelectorAll(".card"));
    const otherCards = cards.filter((card) => card.id !== selectedCardId);
    const sequence = [...otherCards, cards.find((card) => card.id === selectedCardId)];
    const resultText = document.getElementById("result");

    sequence.forEach((card, index) => {
        setTimeout(() => {
            flipSound.currentTime = 0; // 巻き戻して
            flipSound.play(); // 再生
            
            card.classList.add('flip');
            setTimeout(() => {
                // ここで画像を変更！
                if (card.id === winningCardId) {
                    card.src = "images/bi_daru.png";
                } else {
                    card.src = "images/bi_doru.png";
                }
                card.classList.remove('flip'); // アニメーション終了後、クラス外す
            }, 400);

            if (index === sequence.length - 1) {
                if (selectedCardId === winningCardId) {
                    resultText.textContent = "ビーダルが当たりました！";
                } else {
                    resultText.textContent = "ビードルが当たりました！";
                }
            }
        }, 750 * index); //ミリ秒
    });
}
