/**
 * openrouter
 */
export const sendMessageOpenRouter = async (
  messages: any[],
  appKey: string
) => {
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const body = JSON.stringify({
    messages,
    model: "mistralai/mistral-7b-instruct:free",
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appKey}`,
        "X-Title": `test`, // Optional. Shows in rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

/**
 * ? = 'sk' + '-' + 'yqxAQfGuzjqwW9qMEpzHT3BlbkFJQ44ccn0cekvaXBv8neVi'
 */
// export const sendMessage = async (messages: any[]) => {
//   const url = "https://api.openai.com/v1/chat/completions";

//   const body = JSON.stringify({
//     messages,
//     // model: "gpt-3.5-turbo", //  gpt-3.5-turbo-1106
//     model: "gpt-3.5-turbo-1106", //  gpt-3.5-turbo-1106
//     stream: false,
//   });
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ?`,
//       },
//       body,
//     });

//     return await response.json();
//   } catch (error) {
//     console.log(error);
//   }
// };
