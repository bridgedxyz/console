import React from 'react';
import { styled } from '@linaria/react';

import DashboardAppbar from '../components/appbar/dashboard.appbar';
import ProjectCard from '../components/home/project-card';
import Button from '../components/button';

const exampleProjects = Array(6).fill({
  title: 'My New Project',
  lastEdit: 'Updated A Day ago',
  preview: '/assets/examples/project.png',
});

const Home = () => {
  return (
    <>
      <DashboardAppbar />
      <Wrapper>
        <BannerWrapper>
          <BannerContainer>
            <BrandImage src="/assets/images/bridged.svg" />
            <CreateButton>+ Create New</CreateButton>
          </BannerContainer>
        </BannerWrapper>
        <ProjectList>
          {exampleProjects.map((project, projectIndex) => (
            <ProjectCard key={projectIndex} {...project} />
          ))}
        </ProjectList>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.main`
  flex: 1;
  padding-top: 55px;
  padding-bottom: 55px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BannerWrapper = styled.div`
  background-color: black;
  width: 100%;
  height: 32vh;
  display: flex;
`;

const BannerContainer = styled.div`
  width: 92%;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandImage = styled.img`
  width: 123px;
  height: 93px;
`;

const CreateButton = styled(Button)`
  position: absolute;
  bottom: -26px;
  right: 0;
  background-color: #2562ff;
`;

const ProjectList = styled.ul`
  padding: 0;
  list-style-type: none;
  width: 92%;
  margin: 0 auto;
  flex: 1;
  padding-top: 80px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(425px, 1fr));
  grid-column-gap: 1.5rem;
  grid-row-gap: 2.5rem;
`;
