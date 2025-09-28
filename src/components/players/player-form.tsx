import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

interface PlayerFormProps {
  organizationType: string;
  onSave: (player: any) => void;
  onCancel: () => void;
  player?: any;
}

export const PlayerForm = ({ organizationType, onSave, onCancel, player }: PlayerFormProps) => {
  const [formData, setFormData] = useState({
    name: player?.name || '',
    rollNumber: player?.rollNumber || '',
    admissionNumber: player?.admissionNumber || '',
    employeeId: player?.employeeId || '',
    category: player?.category || '',
    department: player?.department || '',
    class: player?.class || '',
    age: player?.age || '',
    phone: player?.phone || '',
    email: player?.email || ''
  });

  const ageCategories = [
    'U-10', 'U-12', 'U-14', 'U-16', 'U-18', 'U-21', 'Senior', 'Veteran'
  ];

  const handleSubmit = () => {
    onSave(formData);
  };

  const renderSchoolFields = () => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="rollNumber">Roll Number*</Label>
          <Input
            id="rollNumber"
            placeholder="e.g., 2024001"
            value={formData.rollNumber}
            onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="admissionNumber">Admission Number</Label>
          <Input
            id="admissionNumber"
            placeholder="e.g., ADM2024001"
            value={formData.admissionNumber}
            onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="class">Class*</Label>
          <Select value={formData.class} onValueChange={(value) => setFormData({ ...formData, class: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={`${i + 1}`}>Class {i + 1}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="category">Age Category*</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {ageCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );

  const renderCorporateFields = () => (
    <>
      <div>
        <Label htmlFor="employeeId">Employee ID*</Label>
        <Input
          id="employeeId"
          placeholder="e.g., EMP001"
          value={formData.employeeId}
          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="department">Department*</Label>
        <Input
          id="department"
          placeholder="e.g., Engineering"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        />
      </div>
    </>
  );

  const renderOtherFields = () => (
    <div>
      <Label htmlFor="category">Category</Label>
      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {ageCategories.map((category) => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {player ? 'Edit Player' : 'Add New Player'}
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name*</Label>
          <Input
            id="name"
            placeholder="Enter player name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {organizationType === 'school' && renderSchoolFields()}
        {organizationType === 'corporate' && renderCorporateFields()}
        {(organizationType === 'academy' || organizationType === 'club') && renderOtherFields()}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
      </div>

      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="hero" className="flex-1" onClick={handleSubmit}>
          {player ? 'Update' : 'Add'} Player
        </Button>
      </div>
    </Card>
  );
};