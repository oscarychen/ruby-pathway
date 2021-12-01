import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Interweave from "interweave";

export interface CardProps {
  header?: string;
  title: string;
  subtitle?: string;
  body?: string;
  link?: string;
}

export default function PopoverCard(props: CardProps) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: "60vw" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.header}
        </Typography>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.subtitle}
        </Typography>
        <Typography variant="body2">
          <Interweave content={props.body} />
        </Typography>
      </CardContent>
      <CardActions>
        {props.link && (
          <Button size="small" target="_blank" rel="noopener noreferrer nofollow" href={props.link}>
            Learn More
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
