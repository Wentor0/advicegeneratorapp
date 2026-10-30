// HTML elementlərini tapırıq
const adviceLabel = document.getElementById("advice-label");
const adviceText = document.getElementById("advice-text");
const adviceButton = document.getElementById("advice-button");

// API-dən yeni məsləhət gətirən funksiya
async function getAdvice() {
  // Sorğu bitənə qədər düyməni söndürürük
  adviceButton.disabled = true;

  try {
    // no-store: brauzer köhnə cavabı yaddaşdan götürməsin
    const response = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });

    // Server xəta qaytarıbsa (məsələn 500), catch hissəsinə keçirik
    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();

    adviceLabel.textContent = "Advice #" + data.slip.id;
    adviceText.textContent = "“" + data.slip.advice + "”";
  } catch (error) {
    // İnternet yoxdursa və ya server xəta veribsə, istifadəçiyə mesaj göstəririk
    console.error(error);
    adviceLabel.textContent = "Error";
    adviceText.textContent = "Could not load advice. Please try again.";
  }

  // API cavabı 2 saniyə keşlənir, ona görə düyməni 2 saniyədən sonra aktiv edirik
  setTimeout(function () {
    adviceButton.disabled = false;
  }, 2000);
}

// Düyməyə basanda yeni məsləhət gəlir
adviceButton.addEventListener("click", getAdvice);

// Səhifə açılanda ilk məsləhət gəlir
getAdvice();
