export interface ScriptAndPromptParams {
  childName: string;
  childNickname?: string;
  childAge: number;
  style: string;
  dreamGift: string;
  achievement: string;
  familySignature?: string;
  customNotes?: string;
}

export interface GeneratedAiContent {
  script: string;
  veo3Prompt: string;
}

export async function generateSantaScriptAndVeo3Prompt(
  params: ScriptAndPromptParams
): Promise<GeneratedAiContent> {
  const apiKey = process.env.GEMINI_API_KEY;
  const nickname = params.childNickname || params.childName.split(' ')[0];
  const signature = params.familySignature || 'Com amor da sua família';

  // Se tivermos a chave do Gemini configurada, chamamos a API
  if (apiKey && apiKey !== 'your_gemini_api_key_here') {
    try {
      const promptText = `
Você é o assistente oficial do Papai Noel e especialista em IA de geração de vídeo cinematográfico (Google Veo 3).
Gere DUAS coisas para este pedido de vídeo de Natal personalizado:

DADOS DA CRIANÇA:
- Nome: ${params.childName}
- Apelido carinhoso: ${nickname}
- Idade: ${params.childAge} anos
- Estilo do vídeo: ${params.style} (opções: emocionante, brincalhao, classico)
- Presente dos sonhos pedido: ${params.dreamGift}
- Maior conquista/vitória do ano: ${params.achievement}
- Assinatura da família: ${signature}
- Observações extras: ${params.customNotes || 'Nenhuma'}

SAÍDA OBRIGATÓRIA EM JSON puro com as seguintes chaves:
{
  "script": "Texto do roteiro falado pelo Papai Noel em português (duração aprox 45-60s). Deve ser muito acolhedor, citar o apelido, parabenizar calorosamente pela conquista e falar do presente dos sonhos. Finalizar com a assinatura da família.",
  "veo3_prompt": "Cinematographic technical prompt in English tailored for Google Veo 3. High quality, realistic details, lighting, 16:9 4k/1080p, cozy festive North Pole workshop, Santa Claus in luxurious red velvet suit speaking warmly to camera, shallow depth of field, warm golden holiday glow, photorealistic textures."
}
Responda APENAS o JSON válido. Sem markdown de código ou explicações.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          if (parsed.script && parsed.veo3_prompt) {
            return {
              script: parsed.script,
              veo3Prompt: parsed.veo3_prompt,
            };
          }
        }
      }
    } catch (err) {
      console.error('[AI] Erro ao chamar API Gemini, utilizando fallback de alta fidelidade:', err);
    }
  }

  // Fallback estruturado de alta qualidade (garantia de resiliência e continuidade)
  let scriptTone = '';
  let veoStyle = '';

  if (params.style === 'brincalhao') {
    scriptTone = `Ho! Ho! Ho! ${nickname}! Olha só quem veio diretamente do Polo Norte bater um papo com você! As renas quase derrubaram a pilha de presentes hoje de manhã de tanta animação! Mas eu parei tudo porque fiquei sabendo da sua super vitória este ano: você ${params.achievement.toLowerCase()}! Que orgulho imenso de você, campeão! E sobre aquela sua cartinha pedindo ${params.dreamGift.toLowerCase()}... os duendes já estão preparando com muito carinho! Continue com esse sorriso lindo e esse coração bondoso. ${signature}! Um Feliz Natal cheio de mágicas!`;
    veoStyle = `Playful and cheerful Santa Claus laughing warmly in a bustling, magical North Pole toy workshop with colorful wooden toys and festive holiday sparks.`;
  } else if (params.style === 'classico') {
    scriptTone = `Ho! Ho! Ho! Minha querida criança, ${nickname}. Aqui no Polo Norte, o fogo da lareira crepita enquanto abro o meu Livro Dourado de Natal. E quando encontrei o seu nome brilhando, meu coração se encheu de alegria ao ver como você ${params.achievement.toLowerCase()}! Essa bondade e dedicação são os maiores tesouros do Natal. O seu pedido de ${params.dreamGift.toLowerCase()} está guardadinho aqui comigo. Nunca perca a fé na magia e o amor pela sua família. ${signature}. Tenha uma noite de Natal verdadeiramente abençoada.`;
    veoStyle = `Classic, traditional Santa Claus sitting beside a crackling stone fireplace in a cozy wooden cabin, reading from a glowing ornate golden book. Warm, rich crimson and amber lighting.`;
  } else {
    // emocionante (default)
    scriptTone = `Ho! Ho! Ho! Meu querido(a) ${nickname}! Enquanto as luzes do Natal começam a brilhar pelo mundo, eu fiz questão de gravar esta mensagem só para você. Eu acompanhei cada passo do seu ano e vi a sua coragem quando você ${params.achievement.toLowerCase()}. Você cresceu tanto e nos encheu de orgulho! Por isso, o seu pedido de ${params.dreamGift.toLowerCase()} foi acolhido com todo o carinho do mundo pelos meus duendes. Continue sendo essa luz especial na vida de todos. ${signature}! Feliz Natal com todo o meu carinho!`;
    veoStyle = `Intimate, heartwarming cinematic portrait of a kindly, realistic Santa Claus speaking softly and emotionally into the camera, gentle snow drifting outside the window, soft candlelit glow, emotional Santa facial expression.`;
  }

  const veo3Prompt = `Cinematic 1080p HD film shot with anamorphic lens: ${veoStyle} Authentic Santa Claus with authentic snowy white beard, kind eyes, rich red velvet suit with real fur trim. Extremely detailed textures, 8k resolution look, warm holiday color grading, shallow depth of field with soft golden bokeh in background. Santa looks directly into camera speaking warmly with genuine facial expressions, 60fps fluid motion, master lighting, award-winning cinematography.`;

  return {
    script: scriptTone,
    veo3Prompt,
  };
}
