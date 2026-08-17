<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { env } from '$env/dynamic/public';

  onMount(() => {
    if (!browser) return;

    const widgetUrl = env.PUBLIC_GRADIENT_WIDGET_URL;
    const agentId = env.PUBLIC_GRADIENT_AGENT_ID;
    const chatbotId = env.PUBLIC_GRADIENT_CHATBOT_ID;

    const enabled =
      typeof widgetUrl === 'string' &&
      widgetUrl.length > 0 &&
      typeof agentId === 'string' &&
      agentId.length > 0 &&
      typeof chatbotId === 'string' &&
      chatbotId.length > 0;

    if (!enabled) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = widgetUrl;
    script.dataset.agentId = agentId;
    script.dataset.chatbotId = chatbotId;
    script.dataset.name = 'Docs assistant';
    script.dataset.primaryColor = '#12372a';
    script.dataset.secondaryColor = '#E5E8ED';
    script.dataset.buttonBackgroundColor = '#1c4c3b';
    script.dataset.startingMessage = 'Ask me anything about Stellarbridge docs.';
    document.head.appendChild(script);
  });
</script>
