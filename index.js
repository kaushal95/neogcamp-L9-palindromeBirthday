const inputElement = document.querySelector("#input");
const btnElement = document.querySelector(".btn");
const outputElement = document.querySelector(".output");

function checkDayMonth(day, month) {
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  return [day, month];
}
function isPalindrome(input) {
  let { day, month, year } = input;
  [day, month] = checkDayMonth(day, month);
  let inputDate = "" + day + month + year;
  console.log(inputDate);
  const reverseDate = inputDate.split("").reverse().join("");
  console.log(reverseDate);
  if (Number(reverseDate) == inputDate) {
    return true;
  }
  return false;
}
function parseInput(input) {
  const inputDate = new Date(input);
  return {
    day: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };
}
function isLeapYear(year) {
  if (year % 400 == 0) {
    return true;
  }
  if (year % 100 == 0) {
    return false;
  }
  if (year % 4 == 0) {
    return true;
  }
  return false;
}
function prevDate(input) {
  const daysinMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let { day, month, year } = input;
  if (day <= 1) {
    if (month == 3 && isLeapYear(year)) {
      day = 29;
      month = 2;
    } else if (month == 1) {
      day = 31;
      month = 1;
      year -= 1;
    } else {
      day = daysinMonths[month - 2];
      month = month - 1;
    }
  } else {
    day -= 1;
  }
  return {
    day,
    month,
    year,
  };
}
function nextDate(input) {
  const daysinMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let { day, month, year } = input;

  if (day >= daysinMonths[month - 1]) {
    if (month == 2 && isLeapYear(year) && day == 28) {
      day += 1;
    } else {
      day = 1;
      month += 1;
    }
  } else {
    day += 1;
  }
  if (month > 12) {
    year += 1;
    month = 1;
  }

  return {
    day,
    month,
    year,
  };
}

function findNextPalindrome(input) {
  let ctr = 0;
  let nextPalindrome = 0;
  let inputDate = { ...input };
  let inputDate1 = { ...input };
  while (true) {
    ctr += 1;
    inputDate = nextDate(inputDate);
    if (isPalindrome(inputDate)) {
      return [ctr, inputDate];
      break;
    }
    inputDate1 = prevDate(inputDate1);
    if (isPalindrome(inputDate1)) {
      return [ctr, inputDate1];
    }
  }
}
btnElement.addEventListener("click", () => {
  const input = inputElement.value;
  hideMessage();
  outputElement.classList.remove("celebrate");
  let parsedDate = {};
  if (input) {
    parsedDate = parseInput(input);
    if (isPalindrome(parsedDate)) {
      outputElement.classList.add("celebrate");
      showMessage("Your Birthday is a Palindrome!!! ✅");
    } else {
      const [ctr, nextPalindrome] = findNextPalindrome(parsedDate);
      let { day, month, year } = nextPalindrome;
      [day, month] = checkDayMonth(day, month);

      showMessage(
        `The nearest Palindrome Date is ${
          day + "-" + month + "-" + year
        }, you missed by ${ctr} days. 😑`
      );
    }
  } else {
    showMessage(`Please enter your Birthday first!!`);
  }
});
function hideMessage() {
  outputElement.style.display = "none";
}
function showMessage(message) {
  outputElement.style.display = "block";
  outputElement.innerText = message;
}
