function photographerTemplate(data) {
    const { name,id,city,country,tagline,price,altname, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
 /*       const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const div = document.createElement( 'div' );
        const p = document.createElement( 'p' );
        p.textContent = city;
        const pDescription = document.createElement( 'p' );
        pDescription.textContent = country;


        div.appendChild(p);
        div.appendChild(pDescription);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(div);*/


        const img = createImage(picture, altname);
        const h2 = createHeading('h2', name);
        const h3 = createHeading('h3', `${city}, ${country}`);
        const tag = createParagraph(tagline);
        const prix = createParagraph(`${price}€/jour`);
        const imgcontainer = createCardContainer([img]);
      
        const content = [imgcontainer, h2, h3, tag, prix];
        const article = createArticleWithLink(id, content, name);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}





// photographer.js




  
   function createImage(src, alt) {
    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('alt', alt);
    return img;
  }
  
   function createHeading(headingType, text) {
    const heading = document.createElement(headingType);
    heading.textContent = text;
    return heading;
  }
  
   function createParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  }
  
   function createCardContainer(children) {
    const imgcontainer = document.createElement('div');
    imgcontainer.classList.add('photographer_card');
    imgcontainer.setAttribute('tabindex', '0');
    children.forEach((child) => {
      imgcontainer.appendChild(child);
    });
    return imgcontainer;
  }
  
  function createArticleWithLink(id, content, name) {
    const article = document.createElement('article');
    const link = createLinkWithHref(`photographer.html?id=${id}`);
    const ariaLabel = `View Photographer Profile: ${name}`;
    link.setAttribute('aria-label', ariaLabel);
    content.forEach((element) => {
      link.appendChild(element);
    });
  
    article.appendChild(link);
    return article;
  }
  
  function createLinkWithHref(href) {
    const link = document.createElement('a');
    link.setAttribute('href', href);
    return link;
  }

