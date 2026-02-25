import { title } from "@/components/primitives";
import { Select, SelectItem } from "@heroui/select";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <div className="max-w-md mx-auto mt-10">
        <Card>
          <CardBody className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Create Profile</h1>

            <Input label="Name" isRequired />

            <Input label="Age" type="number" isRequired />

            <Select label="Gender" selectedKeys={[]}>
              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>
            </Select>

            <Textarea label="Bio" />

            <Input label="Email" type="email" isRequired />

            <Button color="primary" onPress={() => {}}>
              Create Profile
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
