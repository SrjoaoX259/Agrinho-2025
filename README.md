# Agrinho-2025
# Descrição
Este projeto foi desenvolvido como parte do Programa Agrinho 2025. O objetivo central é destacar a importância da conexão entre o campo e a cidade, mostrando como esses dois mundos se complementam e colaboram para um futuro sustentável e equilibrado.

# Qual o objetivo desse projeto??
Foi criado com o objetivo de apresentar e conexão entre o campo e a cidade, e o quão importante as duas são para ambas, e a nossa necessidade dessas duas áreas.

# Público-alvo
O conteúdo foi idealizado para todos os públicos, com linguagem simples, visual envolvente e acessibilidade ampla.

#  Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript (DOM e Canvas)
- Google Fonts
- GitHub Pages (hospedagem)

# Estrutura de pastas
Agrinho-2025/  
│  
├── index.html  
├── style.css  
├── script.js  
└── assets/  
├── imagens/  
└── videos/


---

## ✨ Destaques do Código

### 1. 🌄 Vídeo de Fundo na Página Inicial

```html
<video autoplay muted loop id="background-video">
  <source src="videos/fundo.mp4" type="video/mp4">
</video>
```
> Exibe um vídeo de paisagem cobrindo a tela inteira, criando um impacto visual na entrada do site.

### 2. Animações ao rolar a página (`script.js`)
```java
const sectionsToAnimate = document.querySelectorAll('#video-campo, #video-troca, #conclusao');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('is-visible', entry.isIntersecting);
  });
}, { threshold: 0.5 });
```
>Destaque visual automático para seções importantes ao entrar no campo de visão.

### 3. Design Responsivo com CSS
```css
@media (max-width: 768px) {
  .bloco {
    flex-direction: column;
    text-align: center;
  }
}
````
>Garante que o site funcione bem em celulares e tablets.

## Estrutura de Conteúdo

O site é dividido em seções temáticas:

-   **Introdução com vídeo**
    
-   **Sobre o projeto**
    
-   **Campo e cidade (com imagens e textos informativos)**
    
-   **Vídeos animados**
    
-   **Importância e conclusão**
    
-   **Rodapé com créditos**

## 👨‍💻 Autor

-   **Nome:** João Pedro Leme
    
-   **Ano Escolar:** 2º Ano do Ensino Médio
    
-   **Participação:** Projeto individual
    
-   **Ferramentas usadas:** Inteligência Artificial para conteúdo, imagens e vídeos.


## 🌐 Acesse o Projeto

[Clique aqui para visualizar o site](https://srjoaox259.github.io/Agrinho-2025/ "https://srjoaox259.github.io/Agrinho-2025/")
