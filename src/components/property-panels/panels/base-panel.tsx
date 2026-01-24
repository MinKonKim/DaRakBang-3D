import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

interface BasePanelProps {
    title : React.ReactNode;
    content : React.ReactNode;

}

export const BasePanel : React.FC<BasePanelProps> =({title,content})=>{
  return(
    <Card>
      <CardHeader>
        <CardTitle className="border-b-1 pb-2 ">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}
