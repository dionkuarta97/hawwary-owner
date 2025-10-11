import { Accordion } from '@material-tailwind/react';
import { NavArrowDown } from 'iconoir-react';
import { useState } from 'react';

interface IDefaultAccordionProps {
  title: React.ReactNode;
  content: React.ReactNode;
}

const DefaultAccordion = ({ title, content }: IDefaultAccordionProps) => {
  const [open, setOpen] = useState<string | string[]>([]);
  return (
    <Accordion value={open} onValueChange={setOpen}>
      <Accordion.Item value="react">
        <Accordion.Trigger className="cursor-pointer">
          {title}
          <NavArrowDown className="h-4 w-4 group-data-[open=true]:rotate-180" />
        </Accordion.Trigger>
        <Accordion.Content>{content}</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};

export default DefaultAccordion;
