/**
 * 验证appkey是否有效
 */
export const checkAppKey = async (apiKey: string) => {
  const url = "https://openrouter.ai/api/v1/auth/key";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
