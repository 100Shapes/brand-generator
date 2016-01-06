import hogan from 'hogan.js';

const template = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">

    <path fill="{{ colour1 }}" d="M0 0h1080v1080H0z"/>
    <path fill="{{ colour2 }}" d="M0 540h1080v540H0z"/>
    <path fill="{{ colour3 }}"     d="M178 540v168.5c0 5 4.5 9.5 9.5 9.5H234c5 0 9.5-4.5 9.5-9.5V540H178zm203.2 0c0-74.5 22.8-117 62.7-118v-60c-84 .6-132 67-132 178s48 177.4 132 178v-60c-40-1-63-43-63-118m387-118c40.4 0 63.6 42.5 64 117.4h69C901 428.4 852 362 768 362c-84.5 0-133 66.4-133 177.4h69c0-75 23.3-117.4 64-117.4"/>
    <path fill="{{ colour4 }}"     d="M445.2 362H444v60h1.2c40.7 0 64 42.7 64 118 0 75.8-23.3 118-64 118H444v60h1.2c84.5 0 133-66.6 133-178s-48.5-178-133-178M832 539v.6c0 75.8-23.3 118-64 118-40.6 0-63.8-42.2-63.8-118v-.6H635v.6c0 111.4 48.6 178 133 178 84.6 0 133.2-66.6 133.2-178v-.6H832m-588.5 1V371.5c0-5-4.5-9.5-9.5-9.5h-46.5c-5 0-9.5 4.5-9.5 9.5V540h65.5z"/>

</svg>

  `;

const compiled = hogan.compile(template);

const logo = (colours) => {
  const output = compiled.render(colours).trim();
  return output;
};

export default logo;
