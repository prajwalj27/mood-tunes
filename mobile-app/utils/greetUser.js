export const greetUser = () => {
  const today = new Date();
  const curHr = today.getHours();

  if (curHr < 5) {
    return 'Have a relaxing night';
  } else if (curHr < 12) {
    return 'Good morning'
  } else if (curHr < 17) {
    return 'Good afternoon';
  } else if (curHr < 20) {
    return 'Good evening';
  } else {
    return 'Have a relaxing night';
  }
};
