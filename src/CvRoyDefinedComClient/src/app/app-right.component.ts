import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SkillbarComponent } from './components/skillbar.component';
import { ExperienceComponent } from './components/experience.component';
import { Skill } from './types/Skill';
import { Experience } from './types/Experience';
import { Portfolio } from './types/Portfolio';
import { ModalService } from '../services/modal/modal.service';
import { PortfolioModalComponent } from './modals/portfolio.modal.component';
import { EducationComponent } from './components/education.component';
import { Education } from './types/Education';
import { SkillOther } from './types/Skill-other';
import { SkillOtherComponent } from './components/skill-other.component';

@Component({
    standalone: true,
    selector: 'app-right',
    templateUrl: './app-right.component.html',
    imports: [CommonModule, RouterModule, SkillbarComponent, SkillOtherComponent, ExperienceComponent, EducationComponent, NgOptimizedImage],
    providers: [ModalService],
})
export class AppRightComponent {
    public readonly skillsLanguages: Skill[] = [
        {
            skill: 'HTML',
            width: 70,
        },
        {
            skill: 'CSS',
            width: 75,
        },
        {
            skill: 'Typescript',
            width: 90,
        },
        {
            skill: 'SQL',
            width: 60,
        },
        {
            skill: 'C#',
            width: 98,
        },
        {
            skill: 'OpenGL',
            width: 40,
        },
    ];

    public readonly skillsFrameworks: Skill[] = [
        {
            skill: 'Avalonia',
            width: 50,
        },
        {
            skill: 'Angular',
            width: 90,
        },
        {
            skill: '.NET',
            width: 95,
        },
        {
            skill: 'React',
            width: 30,
        },
        {
            skill: 'Entity Framework',
            width: 80,
        },
        {
            skill: 'Tailwind',
            width: 90,
        },
    ];

    public readonly skillsOther: SkillOther[] = [
        {
            skill: 'Hetzner',
        },
        {
            skill: 'ACS (ACC/BCC compiled)',
        },
        {
            skill: 'Agile',
        },
        {
            skill: 'Scrum',
        },
        {
            skill: 'Github / Gitlab',
        },
        {
            skill: 'Regex',
        },
    ];

    public readonly education: Education[] = [
        {
            school: 'Windesheim Flevoland, Almere',
            from: new Date(2018, 8),
            to: new Date(2020, 7),
            description: 'Software Development Associate degree 2-year course.',
        },
        {
            school: 'ICT Campus, Hilversum',
            from: new Date(2014, 8),
            to: new Date(2017, 7),
            description:
                'Bilingual MBO application developer level 4 training.',
        },
        {
            school: 'VMBO-TL Erfgooiers College, Huizen',
            from: new Date(2010, 8),
            to: new Date(2014, 7),
            description: '',
        },
    ];

    public readonly jobExperiences: Experience[] = [
        {
            job: 'Software Developer',
            company: 'Genetics BV, Almere',
            from: new Date(2023, 1),
            to: new Date(2024, 7),
            description:
                'Frontend + Backend developer at Genetics. Main function involves contributing to Powerbrowser. Creator of the User synchronizer and PDF viewer with annotation support. Also involved in developing and maintaining PowerRedact, an anonimizing tool capable of anonimizing Word and PDF files using AI.',
        },
        {
            job: 'Software Developer',
            company: 'Acto Informatisering, Amersfoort',
            from: new Date(2021, 1),
            to: new Date(2022, 12),
            description:
                'At Acto I was involved with developing ASMv3 and related tools together with an amazing team of developers who were eager to help me out on my first real job. I was also involved in the creation and maintaining of their deployment tools to ensure deployment and maintainment of customers ran smoothly. Nearing my second half at Acto I took over testing and developed helpful testing tools for their application packets to ensure these ran smoothy under different circumstances.',
        },
        {
            job: 'Internship Application Development',
            company: 'Pindrop, Naarden',
            from: new Date(2017, 9),
            to: new Date(2017, 12),
            description: 'Responsible for helping in developing customer Wordpress websites. Tools included Bootstrap and PHP.',
        },
        {
            job: 'Internship Application Development',
            company: 'Asperion, Naarden',
            from: new Date(2015, 8),
            to: new Date(2016, 1),
            description: 'Responsible for helping in developing their ASP.NET application.',
        },
    ];

    public readonly portfolioItems: Portfolio[] = [
        {
            title: 'WebDoomer',
            subtitle: 'Query Zandronum servers on the web.',
            imageSources: ['portfolio/webdoomer0.png', 'portfolio/webdoomer1.png', 'portfolio/webdoomer2.png', 'portfolio/webdoomer3.png'],
            description:
                'WebDoomer is a website that is capable of quickly fetching and displaying Zandronum and QZandronum servers. <br />' +
                'These servers can individually be displayed in more detail, where they will show the current player list and required WAD/PK3 files to join. <br /><br />' +
                'The user can optionally join by using the given command queries (assuming they correctly configured their game location). <br />' +
                'An easier method to join is by downloading Doomseeker, which gives the user a protocol that WebDoomer can use to quickly join the server.<br /><br />' +
                'WebDoomer was made for desktop and mobile, and works very responsive to ensure the best experience. <br />' +
                'The backend of WebDoomer uses a custom build scheduler system which periodically fetches the current server data using a distributed socket system <br />' +
                '<div class="flex gap-2 mt-5 justify-evenly">' +
                '<a href="https://www.webdoomer.com/" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Go to website</a>' +
                '<a href="https://github.com/RoyDefined/WebDoomer" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">GitHub page</a>' +
                '</div>',
        },
        {
            title: 'Zombie Horde 2',
            subtitle: 'Community-driven multiplayer game.',
            imageSources: ['portfolio/zombiehorde0.png', 'portfolio/zombiehorde1.png', 'portfolio/zombiehorde2.png', 'portfolio/zombiehorde3.png'],
            description:
                'Zombie Horde 2 is a multiplayer game which runs on the Zandronum engine. <br/>' +
                'Zandronum is a multiplayer port of the Doom engine, vastly improving the base and introducing a powerful scripting language. <br/><br/>' +
                'Zombie Horde is a mod that has been in development for years by David Bernardi, also known as Xsnake. It started off as a simple passion project all the way back in 2010.' +
                ' With vast features original gameplay, Zombie Horde has quickly a staple in the community with numerous servers containing an ever growing number of players.' +
                ' Xsnake was very satisfied with how Zombie Horde turned out, and decided that it was time to pass the torch to somebody else to continue the work.' +
                " And with that, I have now taken over development. With this change I decided it's best to create the next version, rather than building on what exists. <br/><br/>" +
                'In Zombie Horde 2 you travel across the world and into dimensions to defend against Zombies.<br/>' +
                'Fight off the hordes of zombies in these places, and prevent yourself from getting infected until reaching either safety or cause the Zombies to succumb to the infection.<br/><br/>' +
                'The gameplay of Zombie Horde revolves around single rounds on random maps, where one or more players are picked to be the initial zombie.' +
                ' During the round the Zombie has to infect every single player. When infected, the player turns into a zombie themselves.' +
                ' The round ends if all players are infected, or all zombies are killed.<br/><br/>' +
                'Currently Zombie Horde 2 is still in development, and therefore I do not have any gameplay available. <br/>' +
                'However, there is a dev diary which shows the current state of the weaponry. <br />' +
                '<div class="flex gap-2 mt-5 justify-evenly">' +
                '<a href="https://zandronum.com/" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Zandronum forums</a>' +
                '<a href="https://www.youtube.com/watch?v=DN-0ep2lOtQ" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">View dev diary 1</a>' +
                '</div>',
        },
        {
            title: 'QuickRedact',
            subtitle: 'Quick anonimization of Word and PDF files.',
            imageSources: ['portfolio/quickredact0.png', 'portfolio/quickredact1.png', 'portfolio/quickredact2.jpg', 'portfolio/quickredact3.jpg'],
            description:
                'QuickRedact was one of the more major projects that I have undertaken at Genetics. <br />' +
                'The purpose of QuickRedact was to improve one of the previously created projects named PowerRedact. <br />' +
                'This version of the anonimization tool was capable of quickly and efficiently anonimizing multiple Word and/or PDF files concurrently. The tool uses regex-based solutions but also AI to achieve this. <br /> <br />' +
                'The project was able to give the user a session which they could use to upload and analyze their files. <br />' +
                'The shareable session was made possible by giving individual companies a unique JWT token. Based on this JWT token they could then start a new transaction session which gave them a token unique to their session and company. <br /> <br />' +
                'This project consisted of a PDF viewer capable of rendering PDF pages with a sidebar system on the side which is capable of referencing annotated parts of the file. <br />' +
                'By interaction with this sidebar they could highlight individual parts of the file. Using the three buttons they could either accept the calculated suggestion, reject the suggestion, or reject the suggestion and ensure that all similar suggestions were rejected. <br /> <br />' +
                "In the event that the tool didn't find expected words to anonimize, the user can manually highlight parts of the file to anonimize. <br />" +
                'In this case the user was able to apply the manual anonimization on this single word/sentence, or apply it where similar words/sentences were found.' +
                '<div class="flex gap-2 mt-5 justify-evenly">' +
                '<a href="https://www.genetics.nl/oplossingen/powerredact" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">About PowerRedact</a>' +
                '</div>',
        },
    ];

    private readonly _modalService = inject(ModalService);

    public openPortfolioItem(item: Portfolio) {
        const context = this._modalService.openModal(PortfolioModalComponent);
        (context.modalComponent as PortfolioModalComponent).portfolio.set(item);
    }
}
